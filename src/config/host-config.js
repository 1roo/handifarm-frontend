// 브라우저에서 현재 클라이언트의 호스트 이름 얻어오기
const clientHostName = window.location.hostname;

let backEndHostName; // 백엔드 서버 호스트 이름

if (clientHostName === "localhost") {
  //개발 중
  backEndHostName = "http://localhost:8181";
} else if (clientHostName === "handifarm.com") {
  //배포해서 서비스 중
  backEndHostName = "https://handifarm.com";
}

export const API_BASE_URL = backEndHostName;
export const USER = "/api/user";
export const BOARD = "/api/board";
export const SNS = "/api/cboard";
