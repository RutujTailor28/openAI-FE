import axios from "axios";
import Chip from "@/components/Chip";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const SelectedPage = (props: any) => {
  const { questionsData } = props;
  const [textResponse, setTextResponse] = useState("");
  const [promptQuestion, setPromptQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const chipData = questionsData.map((question: any) => ({
    name: question?.question,
    id: question?.id,
  }));

  const submitHandler = async (data: any) => {
    setTextResponse("");
    setPromptQuestion(data?.name);
    setIsLoading(true);
    promptQuestion && fetchResult(promptQuestion);
  };

  const fetchResult = async (prompQuestion: string) => {
    const response = await axios.post(`http://localhost:4000/generate-text`, {
      prompt: prompQuestion,
    });
    setTextResponse(response?.data?.data?.message?.content);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("i am here", promptQuestion);
    promptQuestion.length > 0 && fetchResult(promptQuestion);
  }, [promptQuestion]);


  return (
    <>
      <div className="p-8">
        <div className="h-[30rem] overflow-auto border-b-2">
          {promptQuestion?.length > 0 && (
            <div>
              <div className="border-b-2 p-6 border-white  bg-purple-500 rounded-2xl text-white mb-3">
                {promptQuestion}
              </div>
              <div className="p-6 bg-gray-100 rounded-2xl">
                {isLoading ? (
                  <div className="px-6">
                    <div className="dot-falling"></div>
                  </div>
                ) : (
                  <div>
                    <div>
                      {textResponse.split("\n").map((e) => (
                        <div>{e}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="p-8">
          <Chip chipData={chipData} onClick={submitHandler} />
        </div>
      </div>
    </>
  );
};

export default SelectedPage;

export const getStaticPaths = async () => {
  const response = await axios.get(
    `http://localhost:4000/techAndFrameworkList`
  );
  const techAndFrameworkList = response?.data?.techAndFrameworkList;
  const pathsArray = techAndFrameworkList?.map((data: any) => ({
    params: {
      selectedPageId: data?.id.toString(),
    },
  }));
  return { paths: pathsArray, fallback: false };
};

export const getStaticProps = async (context: any) => {
  const { params } = context;
  const response = await axios.get(
    `http://localhost:4000/${params.selectedPageId}`
  );
  return {
    props: {
      questionsData: response?.data?.questionsData,
    },
  };
};
