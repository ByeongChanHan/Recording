window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
var msg = new SpeechSynthesisUtterance();

recognition.interimResults = true; //음성인식이 끝나지 않아도 말하는 도중에 계속해서 스크립트가 작성된다
recognition.lang = "ko-KR"; //언어( 기본값은 en-US )

let isRecord = false; //녹음 여부 변수

//<p class = "para"> 태그 생성
let p = document.createElement("p");
p.classList.add("para");

// words 자식으로 문구 추가
let words = document.querySelector(".words");
words.appendChild(p);

let mic = document.querySelector("#circlein"); //마이크 버튼

recognition.addEventListener("result", (e) => {
  let speechToText = "";
  let interimTranscript = "";
  for (let i = e.resultIndex; i < e.results.length; i++) {
    let transcript = e.results[i][0].transcript; //인식된 단어(String) 값을 저장
    //만약 끝이 나면 이어 붙이기
    if (e.results[i].isFinal) {
      speechToText += transcript;
    } else {
      interimTranscript += transcript;
    }
  }
  //녹음을 마쳤을때 호출
  // recognition.addEventListener("soundend", () => {});
  document.querySelector(".para").innerHTML = speechToText + interimTranscript;
  msg.text = speechToText + interimTranscript;
  window.speechSynthesis.speak(msg);
});

//마이크 클릭시 호출
mic.addEventListener("click", () => {
  let Soundresult = document.querySelector(".para").innerHTML;
  // console.log(Soundresult);
  if (Soundresult != "") {
    document.querySelector(".para").innerHTML = "";
  }
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
    msg.text = "";
  }
};

recognition.addEventListener("end", (e) => {
  SetMicoff(true);
});
