"use client";
import React, { useEffect, useRef, useState } from "react";
import WelcomePage from "./welcome";
import axios from "axios";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import TopSuggestedFund from "@/components/topSuggestedFuns";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import InnerBanner from "@/components/innerBanner/InnerBanner";

const FormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  mobile: z.string().nonempty({ message: "Mobile number is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().optional(),
});

const FinancialHealthPage = () => {
  const [isStart, setIsStart] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [performanceData, setPerformanceData] = useState({});
  const [loading, setLoading] = useState(false);
  const [sitedata, setSitedata] = useState([]);
  const hcaptchaRef = useRef(null);

  const fetchSiteData = async () => {
    try {
      const res = await axios.get("/api/admin/site-settings");
      if (res.status === 200) {
        setSitedata(res.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSiteData();
  }, []);

  useEffect(() => {
    if (isQuizCompleted) {
      const suggestedFunds = getSuggestedFunds();
      if (suggestedFunds.length > 0) {
        fetchPerformanceData(suggestedFunds);
      }
    }
  }, [isQuizCompleted]);

  const fetchPerformanceData = async (categories) => {
    setIsModalOpen(true);
    setLoading(true);
    try {
      const queryString = categories
        .map((cat) => encodeURIComponent(cat))
        .join(",");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DATA_API}/api/open-apis/fund-performance/fp-data?categorySchemes=${queryString}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      if (response.status === 200) {
        const { data } = response.data;
        setPerformanceData(data.slice(0, 5));
      }
    } catch (error) {
      console.error("Error fetching performance data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DATA_API}/api/open-apis/health-questions?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      if (response.status === 200) {
        setQuestions(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAnswerSelect = (mark) => {
    setSelectedAnswer(mark);
    const answerText = mark === 1 ? "Yes" : "No";

    const newAnswer = {
      question: questions[currentQuestionIndex].question,
      selectedAnswerMarks: mark,
      selectedAnswerText: answerText,
    };

    setScore((prevScore) => prevScore + mark);

    setTimeout(() => {
      const nextQuestionIndex = currentQuestionIndex + 1;

      if (nextQuestionIndex >= questions.length) {
        setAnswers((prev) => [...prev, newAnswer]);
        setIsQuizCompleted(true);
      } else {
        setAnswers((prev) => [...prev, newAnswer]);
        setCurrentQuestionIndex(nextQuestionIndex);
        setSelectedAnswer(null);
      }
    }, 300);
  };

  const sendAllAnswersToAPI = async (data) => {
    let healthprofile;
    const totalScore = answers.reduce(
      (acc, curr) => acc + curr.selectedAnswerMarks,
      0
    );
    if (totalScore >= 0 && totalScore <= 3) {
      healthprofile = "Critical";
    } else if (totalScore >= 4 && totalScore <= 5) {
      healthprofile = "Weak";
    } else if (totalScore >= 6 && totalScore <= 7) {
      healthprofile = "Border Line";
    } else if (totalScore >= 8 && totalScore <= 9) {
      healthprofile = "Fit";
    } else {
      healthprofile = "Excellent";
    }

    const payload = {
      user: data,
      score: totalScore,
      answers: answers,
      healthprofile: healthprofile,
    };

    const emailContent = answers
      .map((answer) => {
        return `<p><strong>Question:</strong> ${answer.question}</p>
                <p><strong>Answer:</strong> ${answer.selectedAnswerText}</p>`;
      })
      .join("");

    const emaildata = {
      user: data?.username,
      to: data?.email,
      subject: "Thank You for Your Enquiry!",
      html: `Dear ${data?.username},
      Thank you for filling out our enquiry form.
      Your score is ${totalScore}

      Here are the answers you provided:
      ${emailContent}`,
    };

    const senderdata = {
      user: data?.title,
      to: sitedata?.email,
      subject: "New Enquiry",
      html: `New Enquiry from Risk profile\n
User Name : ${data?.username}, \n
Email : ${data?.email} \n
Mobile number : ${data?.mobile} \n
Message : ${data?.message}\n
User score is ${totalScore}

Here are the answers you provided:
${emailContent}`,
    };

    const response = await axios.post("/api/financialhealth", payload);
    await axios.post("/api/email/", emaildata);
    await axios.post("/api/email/", senderdata);

    if (response.status === 201) {
      toast({ description: "Your message has been sent." });
      setLoading(false);
      setIsModalOpen(false);
    } else {
      alert(response.statusText);
    }
  };

  // ✅ Captcha moved inside InquiryForm
  const InquiryForm = () => {
    const [captcha, setCaptcha] = useState("");
    const [captchaImage, setCaptchaImage] = useState("");
    const [userCaptcha, setUserCaptcha] = useState("");

    const form = useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        username: "",
        mobile: "",
        email: "",
        message: "",
      },
    });

    useEffect(() => {
      refreshCaptcha();
    }, []);

    const refreshCaptcha = () => {
      const randomString = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();
      setCaptcha(randomString);

      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40">
        <rect width="100%" height="100%" fill="#f1f1f1"/>
        <text x="10" y="28" font-size="20" font-family="monospace" fill="#333">${randomString}</text>
      </svg>`;
      setCaptchaImage(`data:image/svg+xml;base64,${btoa(svg)}`);

      setUserCaptcha("");
    };

    const onSubmit = async (data) => {
      if (userCaptcha !== captcha) {
        alert("Captcha does not match. Please try again.");
        refreshCaptcha();
        return;
      }

      setLoading(true);
      sendAllAnswersToAPI(data);
    };

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 rounded py-3 px-6 text-black"
        >
          <div className="flex justify-between items-center">
            <h1 className="font-medium text-xl">Please Fill Your Detail Carefully...</h1>
            <Link href="/" className="text-right text-blue-500 font-medium">
              Back
            </Link>
          </div>

          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Mobile */}
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Mobile" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} 
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <textarea
                    placeholder="Message"
                    {...field}
                    className="flex h-10 w-full border-b-2 bg-white shadow-input rounded-md px-3 py-2 text-sm 
         file:border-0 file:bg-transparent file:text-sm file:font-medium 
          focus-visible:outline-none focus-visible:ring-[2px] 
         focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 
         dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none 
         transition duration-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Captcha */}
          <div className="flex items-center space-x-4">
            {captchaImage && (
              <img src={captchaImage} alt="captcha" className="border rounded" />
            )}
            <input
            type="text"
            value={userCaptcha}
            onChange={(e) => setUserCaptcha(e.target.value.toUpperCase())}
            placeholder="Enter Captcha"
            className="flex h-10 w-full border-b-2 bg-white shadow-input rounded-md px-3 py-2 text-sm 
         file:border-0 file:bg-transparent file:text-sm file:font-medium 
          focus-visible:outline-none focus-visible:ring-[2px] 
         focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 
         dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none 
         transition duration-400"
            required
          />
            <button
              type="button"
              onClick={refreshCaptcha}
              className="px-3 py-1 text-sm bg-gray-200 rounded"
            >
              Refresh
            </button>
          </div>
          {/* Submit */}
          <button type="submit" className="primarybutton">
            {!loading ? "Submit" : "Loading..."}
          </button>
        </form>
      </Form>
    );
  };

  const getResultMessage = () => {
    if (score >= 0 && score <= 3)
      return { message: "Critical", color: "text-red-500" };
    if (score >= 4 && score <= 5)
      return { message: "Weak", color: "text-yellow-600" };
    if (score >= 6 && score <= 7)
      return { message: "Border Line", color: "text-yellow-400" };
    if (score >= 8 && score <= 9)
      return { message: "Fit", color: "text-green-400" };
    return { message: "Excellent", color: "text-green-500" };
  };

  const getSuggestedFunds = () => {
    switch (getResultMessage().message) {
      case "Critical":
        return ["Liquid Fund", "Ultra Short Duration Fund", "Balanced Hybrid Fund"];
      case "Weak":
        return ["Conservative Hybrid Fund", "Equity Savings Fund", "Multi Asset Allocation Fund"];
      case "Border Line":
        return ["Aggressive Hybrid Fund", "Large & Mid Cap Fund", "Index Funds/ETFs"];
      case "Fit":
        return ["Flexi Cap Fund", "Mid Cap Fund", "Focused Fund"];
      case "Excellent":
        return ["ELSS Fund", "International Fund", "Thematic Fund"];
      default:
        return [];
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [isStart]);

  return (
    <div>
      <InnerBanner pageName={"Financial health"} />
      <div className="flex flex-col bg-cover bg-center relative">
        {/* <div className="absolute inset-0"></div> */}
        {isModalOpen && (
          <>
            <div className="fixed inset-0 bg-black/30 backdrop-blur-xs z-30"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="p-3 rounded-lg shadow-lg w-[30rem] bg-white ring-1 ring-gray-800 text-white mt-10">
                <InquiryForm
                  onClose={() => {
                    setIsModalOpen(false);
                  }}
                />
              </div>
            </div>
          </>
        )}

        {/* Quiz + Result */}
        <div className="main-section">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col text-center space-y-6">
              <div className="bg-[var(--rv-white)] px-10 py-7 rounded-2xl shadow-xl border border-white/20 min-h-[15rem]">
                {!isStart ? (
                  <WelcomePage onStatus={setIsStart} />
                ) : isQuizCompleted ? (
                  <div className="">
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <Image
                          src={"/images/health-check.webp"}
                          width={900}
                          height={200}
                          alt="Image"
                          className="bg-cover rounded"
                        />
                      </div>
                      <div className="flex flex-col items-center text-center space-y-6">
                        <div className="p-8 rounded-2xl shadow-2xl w-full max-w-md gradient-color">
                          <h2 className="text-xl font-semibold text-white">
                            Your Health checkup is
                          </h2>
                          <div className="mt-3 text-5xl font-extrabold text-white">
                            {getResultMessage().message}
                          </div>
                        </div>

                        <div>
                          <p className="text-black text-xl max-w-md">
                            {getResultMessage().message === "Critical" &&
                              "Your financial health is in danger. Start investing immediately to protect your future."}
                            {getResultMessage().message === "Weak" &&
                              "Your financial base is fragile. Begin with disciplined investing to build strength."}
                            {getResultMessage().message === "Border Line" &&
                              "You’ve made a start, but it’s not enough. Take the next step today."}
                            {getResultMessage().message === "Fit" &&
                              "You're doing well. Keep going with smarter strategies for long-term growth."}
                            {getResultMessage().message === "Excellent" &&
                              "You've built a strong foundation. Now’s the time to diversify and grow faster."}
                          </p>
                        </div>
                        <Link
                          href={"#showfunds"}
                          id="showfunds"
                          className="showfunds primarybutton"
                        >
                          Show Funds
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold mb-2 text-black">
                      {currentQuestionIndex + 1}.{" "}
                      {questions[currentQuestionIndex]?.question}
                    </h2>

                    <div className="mt-5 flex items-center justify-center gap-2">
                      <button
                        className={`primarybutton ${
                          selectedAnswer === 1
                            ? "bg-[var(--rv-secondary)] text-white"
                            : "bg-[var(--rv-primary)] text-white"
                        }`}
                        onClick={() => handleAnswerSelect(1)}
                        disabled={selectedAnswer !== null}
                      >
                        Yes
                      </button>
                      <button
                        className={`primarybutton ${
                          selectedAnswer === 0
                            ? "bg-[var(--rv-secondary)] text-white"
                            : "bg-[var(--rv-primary)] text-white"
                        }`}
                        onClick={() => handleAnswerSelect(0)}
                        disabled={selectedAnswer !== null}
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Suggested Funds */}
              {isQuizCompleted && (
                <div
                  id="showfunds"
                  className="bg-white/10 px-10 py-7 rounded-2xl shadow-xl border border-white/20 "
                >
                  <div className="text-left mt-6">
                    <div className="text-center mb-5">
                      <h3 className="text-2xl font-bold text-black mb-4">
                        Suggested Funds for You
                      </h3>
                      <p className="text-gray-700 mx-auto">
                        The suggested funds are provided based on general
                        categories and historical performance data. These are
                        not personalized financial advice. Please consult your
                        advisor and read scheme documents carefully.
                      </p>
                    </div>

                    {loading && <p className="text-white">⏳ Loading fund suggestions...</p>}

                    {!loading && performanceData.length > 0 && (
                      <TopSuggestedFund performanceData={performanceData} />
                    )}

                    <div className="flex justify-center items-center mt-4">
                      <Link
                        href={"/performance/fund-performance"}
                        className="primarybutton"
                      >
                        Explore more
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthPage;
