//Response로 보내줄 상태코드와 메세지 등을 이 파일에서 관리함

module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message": "성공" },
    /* 신혜 부분 */
    SUCCESS_SIGNUP : { "isSuccess": true, "code": 21001, "message": "회원가입 성공" },
    SUCCESS_SIGNIN : { "isSuccess": true, "code": 21002, "message": "로그인 성공" },
    SUCCESS_UPLOAD_IMG : { "isSuccess": true, "code": 21003, "message": "이미지 URL 추출 성공" },

    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 2000, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 3000, "message":"JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": 1001, "message":"JWT 토큰 검증 성공" }, // ?

    //Request error
    /* 신혜 부분 */
    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 22001, "message":"이메일을 입력해주세요" },
    SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 22002, "message":"이메일 형식을 정확하게 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 22003, "message": "비밀번호를 입력 해주세요." },
    SIGNUP_PHONE_EMPTY : { "isSuccess": false, "code": 22004, "message":"전화번호를 입력해주세요." },
    SIGNUP_PHONE_ERROR_TYPE : { "isSuccess": false,"code": 22005,"message":"유효한 전화번호를 입력해주세요." },
    SIGNUP_EMAIL_LENGTH : { "isSuccess": false, "code": 22006, "message":"이메일은 30자리 미만으로 입력해주세요." },

    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 22011, "message":"이메일을 입력해주세요" },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 22012, "message": "비밀번호를 입력해주세요." },
    SIGNIN_EMAIL_LENGTH : { "isSuccess": false, "code": 22013, "message":"이메일은 30자리 미만으로 입력해주세요." },

    UPLOAD_IMG_EMTPY :  { "isSuccess": false, "code": 22021, "message":"저장할 이미지를 첨부해주세요." },

    /* 기존 부분 */
    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2001, "message":"이메일을 입력해주세요" },
    SIGNUP_EMAIL_LENGTH : { "isSuccess": false, "code": 2002, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2003, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2004, "message": "비밀번호를 입력 해주세요." },
    SIGNUP_PASSWORD_LENGTH : { "isSuccess": false, "code": 2005, "message":"비밀번호는 6~20자리를 입력해주세요." },
    SIGNUP_NICKNAME_EMPTY : { "isSuccess": false, "code": 2006, "message":"닉네임을 입력해주세요." },
    SIGNUP_NICKNAME_LENGTH : { "isSuccess": false,"code": 2007,"message":"닉네임은 최대 20자리를 입력해주세요." },


    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2008, "message":"이메일을 입력해주세요" },
    SIGNIN_EMAIL_LENGTH : { "isSuccess": false, "code": 2009, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNIN_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2010, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2011, "message": "비밀번호를 입력 해주세요." },

    USER_USERID_EMPTY : { "isSuccess": false, "code": 2012, "message": "userId를 입력해주세요." },
    USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 2013, "message": "해당 회원이 존재하지 않습니다." },

    USER_USEREMAIL_EMPTY : { "isSuccess": false, "code": 2014, "message": "이메일을 입력해주세요." },
    USER_USEREMAIL_NOT_EXIST : { "isSuccess": false, "code": 2015, "message": "해당 이메일을 가진 회원이 존재하지 않습니다." },
    USER_ID_NOT_MATCH : { "isSuccess": false, "code": 2016, "message": "유저 아이디 값을 확인해주세요" },
    USER_NICKNAME_EMPTY : { "isSuccess": false, "code": 2017, "message": "변경할 닉네임 값을 입력해주세요" },

    USER_STATUS_EMPTY : { "isSuccess": false, "code": 2018, "message": "회원 상태값을 입력해주세요" },

    // Response error
    /* 신혜 부분 */
    SIGNUP_REDUNDANT_EMAIL : { "isSuccess": false, "code": 23001, "message":"중복된 이메일입니다." },
    SIGNUP_REDUNDANT_PHONE : { "isSuccess": false, "code": 23002, "message":"중복된 전화번호입니다." },

    SIGNIN_EMAIL_WRONG : { "isSuccess": false, "code": 23003, "message": "아이디가 잘못되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 23004, "message": "비밀번호가 잘못되었습니다." },

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 24001, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 24002, "message": "서버 에러"},


}
