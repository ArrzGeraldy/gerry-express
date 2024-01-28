import 'dotenv/config'
const CONFIG = {
  db: process.env.DB,
  jwt_public: `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjSv8QMWOFhBJWm3qFG9s
  rY2e0YKlnjTKpt/PUAn1WUpXNdNYBUFht1SjExkjlikZuiqPUvBDifvSx+8VWQgi
  MynLWK6GP7PTf/d8uZdnGF4gJ2+P4X9usnGFKQy8M+WslNT7/jveih1PjW2sfzr0
  mIHi3E7xjbL1KVunntl+4swzhEnmeQdRFcPFyqzsPimZf7maGKGJywKxWeY/1Y6o
  +LywuV+2u2QYaAgt4MltHUkoBu7Jm4sG4RzRlszrqUxWCgZ7JUvt0zxF5PW4E2vA
  y/LT1qd3BCdohPk/BRKnFhchlxqrCJ9D67E1gjd89p5o+drFE5UU5h0nMmb2IRUP
  pQIDAQAB
  -----END PUBLIC KEY-----`,
  jwt_private: process.env.PRIVATE_JWT
}

export default CONFIG
