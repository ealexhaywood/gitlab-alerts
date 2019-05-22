const config = {};

config.gitlab = {};

config.gitlab.id = process.env.GITLAB_ID || '1';
config.gitlab.iid = process.env.GITLAB_IID || '';
config.gitlab.confidential = process.env.GITLAB_CONFIDENTIAL || false;
config.gitlab.assignee_ids = process.env.GITLAB_ASSIGNEE_IDS || [];
config.gitlab.labels = process.env.GITLAB_LABELS || '';
config.gitlab.due_date = process.env.GITLAB_DUE_DATE || ''; 

config.ssl = {};

config.ssl.enabled = process.env.SSL_ENABLED || false;
config.ssl.key_file_name = process.env.SSL_KEY_FILE_NAME || '';
config.ssl.cert_file_name = process.env.SSL_CERT_FILE_NAME || '';
config.ssl.passphrase = process.env.SSL_PASSPHRASE || '';

module.exports = config;