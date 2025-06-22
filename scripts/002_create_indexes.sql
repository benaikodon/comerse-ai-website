-- Performance indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_subscription_status ON users(subscription_status);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_created_at ON users(created_at);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_chat_sessions_created_at ON chat_sessions(created_at);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_training_data_status ON training_data(status);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);

-- Composite indexes for common queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_analytics_user_type_date ON analytics_events(user_id, event_type, created_at);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_training_data_user_type ON training_data(user_id, data_type);

-- Full-text search indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_training_data_content_gin ON training_data USING gin(content);

-- Partial indexes for active users
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_active_users ON users(id) WHERE subscription_status = 'active';
