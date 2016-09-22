module.exports = function (app) {

  app.all('/', (req, res)=>{
  res.sendFile('index.html', {
    root: path.resolve(__dirname, './../client/dist')
  });

}