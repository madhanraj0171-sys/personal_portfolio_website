export const requireAdmin = (req, res, next) => {
  const configuredAdminKey = process.env.ADMIN_KEY || 'student_admin_secret_2025';
  
  // Accept key via x-admin-key header or Bearer authorization header
  const adminKeyHeader = req.headers['x-admin-key'];
  const authHeader = req.headers.authorization;
  let bearerToken = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    bearerToken = authHeader.split(' ')[1];
  }

  const providedKey = adminKeyHeader || bearerToken;

  if (!providedKey) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Admin authentication key required in x-admin-key header',
    });
  }

  if (providedKey !== configuredAdminKey) {
    return res.status(403).json({
      success: false,
      error: 'Forbidden: Invalid Admin Key',
    });
  }

  next();
};
