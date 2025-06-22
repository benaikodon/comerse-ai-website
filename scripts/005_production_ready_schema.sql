-- Production-ready schema without payment dependencies

-- Update users table for production without payment processors
ALTER TABLE users 
DROP COLUMN IF EXISTS stripe_customer_id,
DROP COLUMN IF EXISTS moneris_customer_id;

-- Add trial management columns
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS usage_current_month INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS usage_reset_date DATE DEFAULT CURRENT_DATE;

-- Create usage tracking table
CREATE TABLE IF NOT EXISTS usage_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    query_type VARCHAR(50) NOT NULL,
    tokens_used INTEGER DEFAULT 0,
    response_time_ms INTEGER,
    resolved BOOLEAN DEFAULT false,
    satisfaction_score INTEGER CHECK (satisfaction_score >= 1 AND satisfaction_score <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscription plans table (for reference, not payment)
CREATE TABLE IF NOT EXISTS subscription_plans (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    monthly_queries INTEGER NOT NULL,
    price_cents INTEGER NOT NULL,
    features JSONB DEFAULT '[]',
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default plans
INSERT INTO subscription_plans (id, name, description, monthly_queries, price_cents, features) VALUES
('trial', 'Trial', '14-day free trial', 1000, 0, '["Basic chat support", "Email support", "Analytics dashboard"]'),
('basic', 'Basic', 'Perfect for small businesses', 10000, 50000, '["10,000 queries/month", "Basic integrations", "Email support", "Analytics dashboard"]'),
('pro', 'Pro', 'Ideal for growing businesses', 50000, 200000, '["50,000 queries/month", "All integrations", "Priority support", "Advanced analytics", "Multi-language support"]'),
('enterprise', 'Enterprise', 'For large organizations', -1, 500000, '["Unlimited queries", "Custom integrations", "24/7 dedicated support", "Custom training", "Voice support"]')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    monthly_queries = EXCLUDED.monthly_queries,
    price_cents = EXCLUDED.price_cents,
    features = EXCLUDED.features;

-- Create contact requests table for sales inquiries
CREATE TABLE IF NOT EXISTS contact_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(50),
    message TEXT,
    plan_interest VARCHAR(50),
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_usage_tracking_user_id ON usage_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_created_at ON usage_tracking(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_requests_status ON contact_requests(status);
CREATE INDEX IF NOT EXISTS idx_users_trial_ends_at ON users(trial_ends_at);
CREATE INDEX IF NOT EXISTS idx_users_usage_reset_date ON users(usage_reset_date);

-- Function to reset monthly usage
CREATE OR REPLACE FUNCTION reset_monthly_usage()
RETURNS void AS $$
BEGIN
    UPDATE users 
    SET 
        usage_current_month = 0,
        usage_reset_date = CURRENT_DATE
    WHERE usage_reset_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- Function to track query usage
CREATE OR REPLACE FUNCTION track_query_usage(
    p_user_id UUID,
    p_query_type VARCHAR(50),
    p_tokens_used INTEGER DEFAULT 1,
    p_response_time_ms INTEGER DEFAULT NULL,
    p_resolved BOOLEAN DEFAULT true,
    p_satisfaction_score INTEGER DEFAULT NULL
)
RETURNS void AS $$
BEGIN
    -- Insert usage record
    INSERT INTO usage_tracking (
        user_id, 
        query_type, 
        tokens_used, 
        response_time_ms, 
        resolved, 
        satisfaction_score
    ) VALUES (
        p_user_id, 
        p_query_type, 
        p_tokens_used, 
        p_response_time_ms, 
        p_resolved, 
        p_satisfaction_score
    );
    
    -- Update user's current month usage
    UPDATE users 
    SET usage_current_month = usage_current_month + p_tokens_used
    WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to check usage limits
CREATE OR REPLACE FUNCTION check_usage_limit(p_user_id UUID)
RETURNS TABLE(
    allowed BOOLEAN,
    current_usage INTEGER,
    monthly_limit INTEGER,
    plan_name VARCHAR(100)
) AS $$
DECLARE
    user_record RECORD;
    plan_record RECORD;
BEGIN
    -- Get user info
    SELECT u.usage_current_month, u.subscription_tier, u.trial_ends_at
    INTO user_record
    FROM users u
    WHERE u.id = p_user_id;
    
    -- Get plan limits
    SELECT sp.monthly_queries, sp.name
    INTO plan_record
    FROM subscription_plans sp
    WHERE sp.id = user_record.subscription_tier;
    
    -- Check if trial expired
    IF user_record.subscription_tier = 'trial' AND user_record.trial_ends_at < NOW() THEN
        RETURN QUERY SELECT false, user_record.usage_current_month, plan_record.monthly_queries, plan_record.name;
        RETURN;
    END IF;
    
    -- Check usage limits (-1 means unlimited)
    IF plan_record.monthly_queries = -1 OR user_record.usage_current_month < plan_record.monthly_queries THEN
        RETURN QUERY SELECT true, user_record.usage_current_month, plan_record.monthly_queries, plan_record.name;
    ELSE
        RETURN QUERY SELECT false, user_record.usage_current_month, plan_record.monthly_queries, plan_record.name;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_requests_updated_at 
    BEFORE UPDATE ON contact_requests 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
