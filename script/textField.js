function countCharacters() {
  let textField = document.getElementById('myTextField');
  let charCount = textField.value.length; // 길이 측정
  let textContent = textField.value.toLowerCase(); // 단어 측정

  // 글자 수 판별
  // 글자 수가 30 이하일 때
  window.T10 = false;
  window.T30 = false;
  window.T31 = false;

  if (charCount >= 10) {
    T10 = true;
  } else if (charCount >= 30) {
    T30 = true;
  } else if (charCount > 30) {
    T31 = true;
  }

  // 각 상태 또는 데이터를 활용하거나 출력할 수 있습니다.
  // console.log('10:', T10);
  // console.log('30:', T30);
  // console.log('31:', T31);

  // 글자 수를 화면에 출력합니다.
  document.getElementById('charCount').innerText = charCount;

  // 특정 단어 판별

  // 1) 비속어 정의
  let badWords = ['시발', '병신', '죽어', '바보', '멍청이'];
  // let textContent = textField.value.toLowerCase();

  // 2) 칭찬, 감사 등 정의
  let goodWords = ['사랑', '고마워', '좋아해'];

  // 3) 특정 단어를 말할 시 그에 맞는 아이콘이 던져짐
  let CatWords = ['고양이', '고양이 귀여워'];

  window.BW = false;
  window.GW = false;
  window.CW = false;
  // 비속어 판별
  badWords.forEach((targetWord) => {
    if (textContent.includes(targetWord.toLowerCase())) {
      BW = true;
    }
  });

  //좋은 단어 판별
  goodWords.forEach((targetWord) => {
    if (textContent.includes(targetWord.toLowerCase())) {
      GW = true;
    }
  });

  //고양이 단어 판별
  CatWords.forEach((targetWord) => {
    if (textContent.includes(targetWord.toLowerCase())) {
      CW = true;
    }
  });
}

// 전봇대에 부딪힘
//쓰레기 통에 넣으면 사라짐
