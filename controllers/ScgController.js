const Client = require('@line/bot-sdk').Client
const mysql = require('mysql')
const client = new Client({
  channelAccessToken: '69e8910e0356694205464aa88367c0e6',
  channelSecret: 'yn91FxQvPOyU0WuMSZY7+I67R16cEb1usF4/aa9hre7XzqJwI4EQAdIaLg49NndlWUp32LDHmzsUQGzOuyMY0tlS0c/NG51wHmBcficS99YoRik8TXtXv/+X4q2QnxTzejqADexeiPVUkZX2wJuZpQdB04t89/1O/w1cDnyilFU='
})

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
})

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
})

module.exports = {
    index (req, res) {

      let message = ''
      const event = req.body.events[0];
      if (event.type === 'message') {
        const message = event.message;
        if (message.type === 'text') {
          con.query("SELECT * FROM info WHERE fullname LIKE '%"+message+"%'", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            result.forEach(element => {
              message += "รหัสพนักงาน: "+element.emp_id+"\r\n"
              message += "ชื่อพนักงาน: "+element.fullname+"\r\n"
              message += "วันที่เริ่มงาน: "+element.start_work+"\r\n"
            })
          })
        }else {
          message = "ไม่พบข้อมูลที่ค้นหา: "
        }
      }
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: message,
      })
    }
  }