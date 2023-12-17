function countCharacters() {
  let textField = document.getElementById('myTextField');
  let charCount = textField.value.length; // 길이 측정
  let textContent = textField.value.toLowerCase(); // 단어 측정

  // 글자 수 판별
  // 글자 수가 30 이하일 때
  window.T10 = false;
  window.T20 = false;
  window.T30 = false;

  if (charCount >= 20 && charCount < 30) {
    T10 = false;
    T20 = true;
  } else if (charCount >= 10 && charCount < 20) {
    T10 = true;
  } else if (charCount >= 20) {
    T20 = false;
    T30 = true;
  } else {
    T10 = false;
    T20 = false;
    T30 = false;
  }

  // 각 상태 또는 데이터를 활용하거나 출력할 수 있습니다.
  console.log('10:', T10);
  console.log('20:', T20);
  console.log('30:', T30);

  // 글자 수를 화면에 출력합니다.
  document.getElementById('charCount').innerText = charCount;

  // 특정 단어 판별

  // 1) 비속어 정의
  let badWords = ['시발', '병신', '죽어', '바보', '멍청이'];
  // let textContent = textField.value.toLowerCase();

  // 2) 칭찬, 감사 등 정의
  let goodWords = ['사랑해', '고마워', '좋아해'];

  // 3) 고양이
  let CatWords = ['고양이', '고양이 귀여워'];

  // 3) 과제
  let AWords = ['과제'];

  window.BW = false;
  window.GW = false;
  window.CW = false;
  window.AW = false;

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

  //과제 단어 판별
  AWords.forEach((targetWord) => {
    if (textContent.includes(targetWord.toLowerCase())) {
      AW = true;
    }
  });
}
