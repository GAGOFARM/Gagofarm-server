const baseResponseStatus = require("../../../config/baseResponseStatus");
const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const profileDao = require("./profileDao");

// Provider: Read 비즈니스 로직 처리

//준영제작 api 1 대응

exports.searchUser = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);

  const userResult = await profileDao.selectUser(connection, parseInt(userId));

  connection.release();
  // 정보 뭐뭐 가져올지 솎아주고, 형식에러랑 처리해주고, 유효값 처리해주고.
  // 필요에 따라 json으로 조합해야 할수도 있음

  return userResult[0]; // 한 명의 유저 정보만을lp 불러오므로 배열 타입을 리턴하는 게 아닌 0번 인덱스를 파싱해서 오브젝트 타입 리턴
};

//준영제작 api 4 대응
exports.searchTrade = async function (userId, mode) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    //DB연결

    // mode에 따라서 결과 처리를 한다.
    const result = [];
    // if mode == 1 or else if mode == 2
    if (mode == 1) {
      // 판매
      const searchTradeResult = await profileDao.selectSaleTrade(
        connection,
        parseInt(userId)
      );

      // 가져온 Result에 담긴 Landidx를 갖고
      for (var i = 0; i < searchTradeResult.length; i++) {
        const searchTradeLand = await profileDao.selectSaleTradeLand(
          connection,
          parseInt(searchTradeResult[i].landIdx)
        );
        const searchImgUrl = await profileDao.selectImgUrl(
          connection,
          parseInt(searchTradeResult[i].landIdx)
        );
        const temp = [];
        for (var img of searchImgUrl) {
          temp.push(img.imgUrl);
        }
        searchTradeLand[0].imgUrl = temp;

        result.push(searchTradeLand);
      }

      if (result.length == 0) {
        return false;
      }

      return result;
    } else if (mode == 2) {
      //구매
      const searchTradeResult = await profileDao.selectBuyTrade(
        connection,
        parseInt(userId)
      );

      // 가져온 Result에 담긴 Landidx를 갖고
      for (var i = 0; i < searchTradeResult.length; i++) {
        const searchTradeLand = await profileDao.selectBuyTradeLand(
          connection,
          parseInt(searchTradeResult[i].landIdx)
        );
        const searchImgUrl = await profileDao.selectImgUrl(
          connection,
          parseInt(searchTradeResult[i].landIdx)
        );

        const temp = [];
        for (var img of searchImgUrl) {
          temp.push(img.imgUrl);
        }
        searchTradeLand[0].imgUrl = temp;

        result.push(searchTradeLand);
      }
      if (result.length == 0) {
        return false;
      }
      return result;
    }
  } catch (err) {
    logger.error(`App - searchTrade Service error\n: ${err.message}`);
  }
};

exports.retrieveUserList = async function (email) {
  //email을 인자로 받는 경우와 받지 않는 경우를 구분하여 하나의 함수에서 두 가지 기능을 처리함

  if (!email) {
    // connection 은 db와의 연결을 도와줌
    const connection = await pool.getConnection(async (conn) => conn);
    // Dao 쿼리문의 결과를 호출
    const userListResult = await userDao.selectUser(connection);
    // connection 해제
    connection.release();

    return userListResult;
  } else {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectUserEmail(connection, email);
    connection.release();

    return userListResult;
  }
};

exports.retrieveUser = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userResult = await profileDao.selectUserId(connection, userId);

  connection.release();

  return userResult[0]; // 한 명의 유저 정보만을 불러오므로 배열 타입을 리턴하는 게 아닌 0번 인덱스를 파싱해서 오브젝트 타입 리턴
};

exports.emailCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await userDao.selectUserEmail(connection, email);
  connection.release();

  return emailCheckResult;
};

exports.passwordCheck = async function (selectUserPasswordParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  // 쿼리문에 여러개의 인자를 전달할 때 selectUserPasswordParams와 같이 사용합니다.
  const passwordCheckResult = await userDao.selectUserPassword(
    connection,
    selectUserPasswordParams
  );
  connection.release();
  return passwordCheckResult[0];
};

exports.accountCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAccountResult = await userDao.selectUserAccount(connection, email);
  connection.release();

  return userAccountResult;
};
