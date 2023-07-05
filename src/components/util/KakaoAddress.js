import DaumPostcode from 'react-daum-postcode';

const KakaoAddress = (props) => {
    
    const complete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if(data.addressType === 'R') {
            if(data.bname !== '') {
                extraAddress += data.bname;
            }
            if(data.buildName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(data)
        console.log(fullAddress)
        console.log(data.zonecode)

        props.setcompany({
            ...props.company,
            address:fullAddress,
        })
    }

    return (
        <div>
            <DaumPostcode className="postmodal" 
                autoClose 
                onComplete={complete} />
        </div>
    );

};

export default KakaoAddress;