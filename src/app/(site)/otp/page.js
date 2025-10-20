import { Button, Form, message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const page = ({params}) => {
    const [form] = Form.useForm();
 
  
    const [loading,setLoading]=useState(false);
    
    const handleFinish = async (values) => {
      setLoading(true);
      const {error,msg,data}=await verifyOtp({otp:values?.otp,email:otpPayload?.email});
      if(error){
        message.error(msg);
        setLoading(false);
      }
      else{
        message.success(msg);
        setLoading(false)
      }
    };
    const { time, start, pause, reset } = useTimer({
      initialTime: 120,
      timerType: "DECREMENTAL",
    });
  
    useEffect(() => {
      if (params?.email) {
        start();
      }
      if (time === 0) pause();
    }, [time, start, pause, params?.email]);
    return (
        <div>
        <div className="sm:max-w-[488px] w-full  mx-auto bg-white rounded-[20px] p-4 sm:p-10 relative ">
     
        <h2 className="text-center sm:leading-[32.84px] sm:text-[28px] text-base font-semibold text-[#242628] mb-[40px] ">
          Email verification code
        </h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="sm:px-[44px] px-[20px] flex flex-col items-center"
        >
          <>
            <h1 className="text-base font-normal text-center">
              Your Code to
              <span className="text-primary ms-1">{params?.email}</span>
            </h1>
            <Form.Item name="otp" className="my-8 flex flex-col items-center">
              <OTPInput
                numInputs={6}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  width: "40px",
                  height: "40px",
                  marginRight: "1rem",
                  fontSize: "24px",
                  lineHeight: "28.15px",
                  border: "1px solid #EDEDED",
                  fontWeight: "500",
                  outline: "none",
                  borderRadius: "8px",
                  display: "flex",
                  columnGap: "16px",
                  justifyContent: "center",
                }}
              />
            </Form.Item>
            <p className="dark:text-White_Color capitalize mt-6 mb-2 md:text-sm text-base font-poppins">
              Didn't receive the code? 
              {time === 0 ? (
                <span
                  className={`text-primary cursor-pointer `}
                  onClick={async () => {
                    reset();
                 
                  }}
                >
              Resend
                </span>
              ) : (
                <span className="text-primary">
               Resend in {time} s
                </span>
              )}
            </p>

            <Button className={"w-full  my-[16px] "} type="submit">
               {loading?"Verifying":"Verify"}
            </Button>
          </>
        </Form>
      </div>
        </div>
    );
};

export default page;