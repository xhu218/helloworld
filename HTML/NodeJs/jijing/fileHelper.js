var qn = require("./form_upload_simple.js");

fileHelper = {

    readfromFile: function(file) {
        var rf = require("fs");
        var data = rf.readFileSync(file, "utf-8");
        return data;
    },

    writetoFile: function(content, file, append, callback) {
        var fs = require("fs");
        var path = require("path");

        


    



        if (append) {
            fs.appendFile(file, content, function(err) {
                if (err) {
                    console.log("fail" + err)
                } else {
                    //console.log("写入文件成功 : " + file);
                }

            });
        } else {
            fs.writeFile(file, content, function(err) {
                if (err) {
                    console.log("fail" + err)
                } else {

                    try {

                        //qn.Test1(file.replace("/home/Service/script/",""));
                        //if (file.indexOf("MyCProgram") < 0)
                        //qn.Test1(file);
                    } catch (error) { console.log(error); }

                    console.log("写入文件成功 : " + file);
                    if (typeof callback == "function") {
                        callback(file)
                    }
                }

            });


        }
    }
}

module.exports = fileHelper;