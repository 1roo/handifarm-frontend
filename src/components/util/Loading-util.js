
//어디서든지 로딩창을 불러올 수 있게끔 제작.
export const loadingPage = (
    <div id="loading">
        <img src={require("../../image/handifarm_75fps.gif")} alt="로딩창" />
    </div>   
)

export const loadingSmallPage = (
    <div id="loading" className="small">
        <img src={require("../../image/handifarm_75fps.gif")} alt="로딩창" />
    </div>   
)
