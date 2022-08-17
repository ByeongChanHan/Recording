window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.interimResults = true; //아직 인식이 완료되지 않은 중간 결과 값
recognition.lang = "ko-KR"; //언어( 기본값은 en-US )

let isRecord = false; //녹음 여부 변수

//<p class = "para"> 태그 생성
let p = document.createElement("p");
p.classList.add("para");

// words 자식으로 문구 추가
let words = document.querySelector(".words");
words.appendChild(p);

let mic = document.querySelector("#circlein"); //마이크 버튼
let speechToText = "";

recognition.addEventListener("result", (e) => {
  let interimTranscript = "";
  let len = e.results.length;
  for (let i = e.resultIndex; i < len; i++) {
    let transcript = e.results[i][0].transcript; //인식된 단어(String) 값을 저장
    //만약 끝이 나면 이어 붙이기
    if (e.results[i].isFinal) {
      speechToText += transcript;
    } else {
      interimTranscript += transcript;
    }
  }
  //녹음을 마쳤을때 호출
  recognition.addEventListener("soundend", () => {
    SetMicoff(false);
  });

  document.querySelector(".para").innerHTML = speechToText + interimTranscript;
});

//마이크 클릭시 호출
mic.addEventListener("click", () => {
  if (isRecord == false) {
    SetMicoff(isRecord);
  } else {
    SetMicoff(isRecord);
  }
});

// 마이크 셋팅함수
// ....
const SetMicoff = (bflag) => {
  if (bflag == false) {
    console.log("마이크켜짐");
    recognition.start();
    mic.style.backgroundColor = "#6BD6E1";
    isRecord = true;
  } else {
    console.log("마이크꺼짐");
    recognition.stop();
    mic.style.backgroundColor = null;
    isRecord = false;
  }
};

recognition.addEventListener("end", (e) => {
  alert("음성인식 서비스 연결이 해제되었습니다.");
  SetMicoff(true);
});
