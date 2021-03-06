var dbconnect = require('./dbconnect.js');
var moment = require('moment');
var con = dbconnect.getCon();
function signUp(firstname,lastname,email,phone){
    con.query('INSERT INTO members (fname, lname, email, phone, date_joined) VALUES ( ? , ? , ? , ? , ? ) ', [
        firstname,
        lastname,
        email,
        phone,
        moment().format()
        ],
        function (err) {
        if (err){
          console.log(err);
          return;
        }
        console.log("1 record inserted");
      });
}
function getMembers(callback){
    con.query("SELECT * FROM members", function (err, result) {
        if (err){
          return callback(err, null);
        }
        return callback(null, result);
    });
}
function deleteMemberByDate(dateJoined){
    con.query('DELETE FROM members WHERE date_joined = ?', [dateJoined],
    function (err) {
        if (err){
          console.log(err);
          return;
        }
        console.log("1 record deleted");
    });
}
function getWebText(callback){
  con.query("SELECT * from WebText", function (err, result){
    if (err){
      return callback(err,null);
    }
    return callback(null,result)
  })
}
function setBannerText(bannerText){
  con.query('UPDATE WebText SET BannerText = ?', [bannerText],
    function (err) {
        if (err){
          console.log(err);
          return;
        }
        console.log("1 record changed");
    });
}
module.exports.signUp = signUp;
module.exports.getMembers = getMembers;
module.exports.deleteMemberByDate = deleteMemberByDate;
module.exports.getWebText = getWebText;
module.exports.setBannerText = setBannerText;