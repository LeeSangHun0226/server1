const express = require('express');
const User = require('../models/user');
const TokenManager = require('../TokenManager');

const router = express.Router();


// 프로토 타입에서는 직접 서울시의 구를 입력해놨지만, 차후 지도 API 로 업그레이드 할 예정
const seoulBorough = [
  'a', '도봉구', '강북구', '노원구', '은평구', '성북구', '중랑구', '종로구', '동대문구',
  '서대문구', '중구', '성동구', '마포구', '용산구', '광진구', '강동구', '송파구',
  '강남구', '서초구', '동작구', '관악구', '금천구', '영등포구', '구로구', '양천구', '강서구',
];

/* ------------------------------------------------
  1. 게임 생성, 수정 : /api/game_register/
  2. 게임 확인 : /api/game_register/confirm
  3. 게임 삭제 : /api/game_register/delete

  CODE SAMPLE LIST :
    place: into seoul_borough,
    playground,
    playdate,
  ------------------------------------------------
*/

/* ------------------------------------------------
  GAME RESISTER ADD : POST /api/game_register/
  ERROR CODES:
          1. BAD place
          2. BAD playground
          3. BAD playdate
  ------------------------------------------------
*/

router.post('/', (req, res) => {

  // 1. BAD place
  if (seoulBorough.indexOf(req.body.place) === -1) {
    return res.status(400).json({
      error: 'BAD place',
      code: 1,
    });
  }

  // 2. BAD playground
    // TODO code

  // 3. BAD playdate
  // if (req.body.playdate !== 'string') {
  //   return res.status(400).json({
  //     error: 'BAD playdate',
  //     code: 2,
  //   });
  // }

  // FIND VALID ID FROM TOKEN
  const token = req.body.userToken.token;
  const userId = TokenManager.getIDFromToken(token);

  const updateData = {
    place: req.body.place,
    playground: req.body.playground,
    playdate: req.body.playdate,
  };

  User.findOne({ id: userId }, (err, data) => {
    if (err) throw err;

    User.update(data, { $set: updateData }, (err) => {
      if (err) throw err;

      User.findOne({ id: userId }, (err, data) => {
        if (err) throw err;
        return res.json({
          success: true,
          data,
        });
      });
    });
  });
});

/* -------------------------------------------------------
  GAME RESISTER CONFIRM : PUT /api/game_register/confirm
  ERROR CODES:
  -------------------------------------------------------
*/

router.use('/confirm', (req, res) => {

  const token = req.body.userToken.token;
  const userId = TokenManager.getIDFromToken(token);

  User.findOne({ id: userId }, (err, data) => {
    if (err) throw err;
    return res.json({
      success: true,
      data,
    });
  });
});

/* -------------------------------------------------------
  GAME RESISTER DELETE : DELETE /api/game_register/delete
  ERROR CODES:
          1. BAD place
          2. BAD playground
          3. BAD playdate
  -------------------------------------------------------
*/

router.post('/delete', (req, res) => {

  const token = req.body.userToken.token;
  const userId = TokenManager.getIDFromToken(token);

  User.findOne({ id: userId }, (err, data) => {
    if (err) throw err;
    User.remove(data, (err) => {
      if (err) throw err;
      return res.json({ success: true });
    });
  });
});


/* -------------------------------------------------------
  GAME RESISTER CONFIRM : POST /api/game_register/confirm
  ERROR CODES:
  -------------------------------------------------------
*/


router.post('/confirm', (req, res) => {

  const token = req.body.userToken.token;
  const userId = TokenManager.getIDFromToken(token);

  User.findOne({ id: userId }, (err, data) => {
    if (err) throw err;
    return res.json({
      success: true,
      data,
    });
  });
});

module.exports = router;
