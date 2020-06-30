module.exports = async (req, res, next) => {
  try {
    
    console.log(req.user.role);
    if (req.user.role !== 'admin') {
      console.log('Permission denied');
      return res.sendStatus(403);
    }
    console.log('Ok');
    next();
  }
  catch (err) {
    res.sendStatus(500);
  }
}
