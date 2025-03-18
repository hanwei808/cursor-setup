const errorHandler = (err, req, res, next) => {
  console.error(err.stack)

  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || '服务器内部错误'
  })
}

module.exports = errorHandler 