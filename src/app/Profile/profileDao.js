// 새롭게 추가한 함수를 아래 부분에서 export 해줘야 외부의 Provider, Service 등에서 사용가능합니다.

// made by jun

// api no 1 대응 sql

async function selectUser(connection, id) {
  const searchUserQuery = `
              select email, nickname, profilePhoto, isSeller  
              from User 
              where userIdx = ?
              `;
  const [userRows] = await connection.query(searchUserQuery, id);
  return userRows;
}

// api no 2 대응 sql
//insert into Bookmark (userIdx, landIdx) values (3,4)
async function insertBookmark(connection, insertBookmark) {
  const insertBookmarkQuery = `
              insert into Bookmark (userIdx, landIdx) 
              values (?,?)
              `;
  const [bookmarkRows] = await connection.query(
    insertBookmarkQuery,
    insertBookmark
  );
  return bookmarkRows;
}

// api no 3 대응 sql
// delete from Bookmark where userIdx = ? and landIdx = ?;

async function deleteBookmark(connection, deleteBookmark) {
  const deleteBookmarkQuery = `
              delete from Bookmark 
              where userIdx = ? and landIdx = ?;
              `;
  const deleteBookmarkRows = await connection.query(
    deleteBookmarkQuery,
    deleteBookmark
  );
  return deleteBookmarkRows;
}

// api no 4 대응 sql mode 1
//
async function selectSaleTrade(connection, userid) {
  const selectSaleTradeQuery = `
              select landIdx from TradeHistory 
              where sellerIdx = ?;
              `;

  const [selectSaleTradeRows] = await connection.query(
    selectSaleTradeQuery,
    userid
  );
  return selectSaleTradeRows;
}

// api no 4 대응 sql mode 2
async function selectBuyTrade(connection, userid) {
  const selectBuyTradeQuery = `
              select landIdx from TradeHistory 
              where buyerIdx = ?;
              `;

  const [selectBuyTradeRows] = await connection.query(
    selectBuyTradeQuery,
    userid
  );
  return selectBuyTradeRows;
}

// api no 4에서 땅 찾기 쿼리
async function selectSaleTradeLand(connection, landid) {
  const selectSaleTradeLandQuery = `
  select landIdx,price, addr, startAt, endAt
  from Land where landIdx = ?
              `;
  const [selectSaleTradeRows] = await connection.query(
    selectSaleTradeLandQuery,
    landid
  );
  return selectSaleTradeRows;
}

// api no 4에서 imgurl찾기 쿼리

async function selectImgUrl(connection, landid) {
  const selectImgUrlQuery = `
  select imgUrl
  from LandImg where landIdx = ?
              `;
  const [selectImgUrlRows] = await connection.query(selectImgUrlQuery, landid);
  return selectImgUrlRows;
}

// 모든 유저 조회
// async function selectUser(connection) {
//   const selectUserListQuery = `
//                 SELECT email, nickname
//                 FROM UserInfo;
//                 `;
//   const [userRows] = await connection.query(selectUserListQuery);
//   return userRows;
// }

// 이메일로 회원 조회
async function selectUserEmail(connection, email) {
  const selectUserEmailQuery = `
                SELECT email, nickname 
                FROM UserInfo 
                WHERE email = ?;
                `;
  const [emailRows] = await connection.query(selectUserEmailQuery, email);
  return emailRows;
}

// userId 회원 조회
async function selectUserId(connection, userId) {
  const selectUserIdQuery = `
                 SELECT id, email, nickname 
                 FROM UserInfo 
                 WHERE id = ?;
                 `;
  const [userRow] = await connection.query(selectUserIdQuery, userId);
  return userRow;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO UserInfo(email, password, nickname)
        VALUES (?, ?, ?);
    `;
  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertUserInfoParams
  );

  return insertUserInfoRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT email, nickname, password
        FROM UserInfo 
        WHERE email = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
    selectUserPasswordQuery,
    selectUserPasswordParams
  );

  return selectUserPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, email) {
  const selectUserAccountQuery = `
        SELECT status, id
        FROM UserInfo 
        WHERE email = ?;`;
  const selectUserAccountRow = await connection.query(
    selectUserAccountQuery,
    email
  );
  return selectUserAccountRow[0];
}

async function updateUserInfo(connection, id, nickname) {
  const updateUserQuery = `
  UPDATE UserInfo 
  SET nickname = ?
  WHERE id = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [nickname, id]);
  return updateUserRow[0];
}

module.exports = {
  selectUser,
  insertBookmark,
  deleteBookmark,
  selectSaleTrade,
  selectBuyTrade,
  selectImgUrl,
  selectSaleTradeLand,
  selectUserEmail,
  selectUserId,
  insertUserInfo,
  selectUserPassword,
  selectUserAccount,
  updateUserInfo,
};
