const config = {};

// This server's port
config.port = 80;

// This server's SSL configuration
config.ssl = {};
config.ssl.enabled = process.env.SSL_ENABLED || false;
config.ssl.key_file_name = process.env.SSL_KEY_FILE_NAME || '';
config.ssl.cert_file_name = process.env.SSL_CERT_FILE_NAME || '';
config.ssl.passphrase = process.env.SSL_PASSPHRASE || '';

// Configuration for gitlab
config.gitlab = {};
config.gitlab.url = process.env.GITLAB_URL || 'http://localhost:30080';
config.gitlab.api_prefix = process.env.GITLAB_API_PREFIX || '/api/v4/projects/';
// See https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#personal-access-tokens
config.gitlab.access_token = process.env.ACCESS_TOKEN || '6vvgXdrsTBHevctUSxSK';
config.gitlab.id = process.env.PROJECT_ID || '1';
config.gitlab.iid = process.env.GITLAB_IID || '';
config.gitlab.confidential = process.env.GITLAB_CONFIDENTIAL || false;
config.gitlab.assignee_ids = process.env.GITLAB_ASSIGNEE_IDS || [];
config.gitlab.labels = process.env.GITLAB_LABELS || '';
config.gitlab.due_date = process.env.GITLAB_DUE_DATE || '';

module.exports = config;