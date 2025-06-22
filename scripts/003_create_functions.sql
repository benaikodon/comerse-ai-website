-- Function to get user usage statistics
CREATE OR REPLACE FUNCTION get_user_usage_stats(user_uuid UUID, days_back INTEGER DEFAULT 30)
RETURNS TABLE (
  total_queries BIGINT,
  resolved_queries BIGINT,
  resolution_rate NUMERIC,
  avg_satisfaction NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) FILTER (WHERE event_type = 'chat_query') as total_queries,
    COUNT(*) FILTER (WHERE event_type = 'query_resolved') as resolved_queries,
    CASE 
      WHEN COUNT(*) FILTER (WHERE event_type = 'chat_query') > 0 
      THEN ROUND((COUNT(*) FILTER (WHERE event_type = 'query_resolved')::NUMERIC / COUNT(*) FILTER (WHERE event_type = 'chat_query')::NUMERIC) * 100, 2)
      ELSE 0
    END as resolution_rate,
    COALESCE(AVG((event_data->>'rating')::NUMERIC) FILTER (WHERE event_type = 'satisfaction_rating'), 0) as avg_satisfaction
  FROM analytics_events 
  WHERE user_id = user_uuid 
    AND created_at >= NOW() - INTERVAL '1 day' * days_back;
END;
$$ LANGUAGE plpgsql;

-- Function to clean up old data
CREATE OR REPLACE FUNCTION cleanup_old_data()
RETURNS void AS $$
BEGIN
  -- Delete analytics events older than 1 year
  DELETE FROM analytics_events 
  WHERE created_at < NOW() - INTERVAL '1 year';
  
  -- Delete chat sessions older than 6 months for trial users
  DELETE FROM chat_sessions 
  WHERE created_at < NOW() - INTERVAL '6 months'
    AND user_id IN (
      SELECT id FROM users WHERE subscription_tier = 'trial'
    );
    
  -- Delete failed training data older than 30 days
  DELETE FROM training_data 
  WHERE status = 'failed' 
    AND created_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Function to check subscription limits
CREATE OR REPLACE FUNCTION check_subscription_limit(user_uuid UUID)
RETURNS TABLE (
  current_usage BIGINT,
  monthly_limit BIGINT,
  can_use_service BOOLEAN
) AS $$
DECLARE
  user_tier TEXT;
  tier_limits RECORD;
BEGIN
  -- Get user subscription tier
  SELECT subscription_tier INTO user_tier 
  FROM users 
  WHERE id = user_uuid;
  
  -- Define limits based on tier
  CASE user_tier
    WHEN 'trial' THEN 
      tier_limits.limit := 1000;
    WHEN 'basic' THEN 
      tier_limits.limit := 10000;
    WHEN 'pro' THEN 
      tier_limits.limit := 50000;
    WHEN 'enterprise' THEN 
      tier_limits.limit := -1; -- unlimited
    ELSE 
      tier_limits.limit := 0;
  END CASE;
  
  -- Get current month usage
  SELECT COUNT(*) INTO tier_limits.usage
  FROM analytics_events 
  WHERE user_id = user_uuid 
    AND event_type = 'chat_query'
    AND created_at >= date_trunc('month', NOW());
  
  RETURN QUERY
  SELECT 
    tier_limits.usage,
    tier_limits.limit,
    (tier_limits.limit = -1 OR tier_limits.usage < tier_limits.limit) as can_use_service;
END;
$$ LANGUAGE plpgsql;
