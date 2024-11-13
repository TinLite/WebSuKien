import connection from "./services/SqlConnection";
import readline from "readline";
import { stdin, stdout } from "process";
import bcrypt from "bcrypt";

const inp = readline.createInterface(stdin, stdout);

inp.question("Đang tạo tài khoản admin. Tên đăng nhập: ", (username) => {
  inp.question("Mật khẩu: ", (password) => {
    var hashedPassword = bcrypt.hashSync(password, 10);
    connection.pool.query(
      `INSERT INTO user (username, password, role) VALUES ('${username}', '${hashedPassword}', 'admin')`,
      (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Tạo tài khoản admin thành công.");
        }
        connection.pool.end();
        inp.close();
      }
    );
  });
});
