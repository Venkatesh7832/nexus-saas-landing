export const codeLines: string[] = [
  'const deployment = await nexus.deploy({',
  "  environment: 'production',",
  "  region: 'us-east-1',",
  '  autoScale: true,',
  '});',
]

export const securityChecks: string[] = [
  'AES-256 encryption at rest',
  'TLS 1.3 in transit',
  'SSO and SAML',
  'Role-based access control',
]

export const chartPoints: number[] = [18, 26, 22, 34, 30, 44, 40, 54, 50, 64, 72, 86]
