import React, { useState, useEffect } from "react";
import axios from "axios";
import { PEST_KEY } from "../../config/key-config";

const Pest = () => {
  const [responseMessage, setResponseMessage] = useState(""); // 한글로 된 응답 메시지를 저장하는 상태 변수
  const [response2Data, setResponse2Data] = useState(null); // 새로운 응답 데이터를 저장하는 상태 변수

  const pestStart = async () => {
    try {
      const response = await axios.get(
        "/npmsAPI/service?apiKey=" +
          PEST_KEY +
          "&serviceCode=SVC51&serviceType=AA001&searchExaminYear=2023&searchPredictnSpchcknCode=00204&searchKncrCode=FC010101"
      );

      const responseDataDay = response.data;
      console.log(responseDataDay);

      // XML 문서 파싱
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(responseDataDay, "text/xml");

      // insectKey 요소 찾기
      const insectKeyElement = xmlDoc.getElementsByTagName("insectKey")[0];

      const latestInsectKey = insectKeyElement.textContent;
      console.log(latestInsectKey);

      const response2 = await axios.get(
        "/npmsAPI/service?apiKey=" +
          PEST_KEY +
          "&serviceCode=SVC52&serviceType=AA001&insectKey=" +
          latestInsectKey
      );

      const response2Data = response2.data;
      console.log(response2Data);
      // 새로운 응답 데이터를 상태 변수에 설정
      setResponse2Data(response2Data);
    } catch (error) {
      console.error("데이터를 불러오는데 에러 발생:", error);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 데이터를 가져오기 위해 pestStart 함수를 호출합니다.
    pestStart();
  }, []);

  return (
    <div>
      <h1>API 응답 메시지</h1>
      <p>{responseMessage}</p>

      {/* 새로운 응답 데이터 출력 */}
      {response2Data && (
        <div>
          <h2>새로운 응답 데이터</h2>
          <pre>{response2Data}</pre>
        </div>
      )}
    </div>
  );
};

export default Pest;
