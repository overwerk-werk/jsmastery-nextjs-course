import QuestionCard from "@/components/cards/QuestionCard"
import HomeFilter from "@/components/filters/HomeFilter"
import LocalSearch from "@/components/search/LocalSearch"
import { Button } from "@/components/ui/button"
import ROUTES from "@/constants/routes"
import handleError from "@/lib/handlers/errors"
import dbConnect from "@/lib/mongoose"// 
import { SearchParams } from "next/dist/server/request/search-params"
import Link from "next/link"

const questions = [
    {_id: "1", title: "How to learn React?",
      description: "I want to learn React, can anyone help me?",
      tags: [
        {_id: "1", name: "React"},
        {_id: "2", name: "JavaScript"},
      ], author: {_id: "1", name: "John Doe", image: "https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"},
      upvotes: 10,
      answers: 5,
      views: 100,
      createdAt: new Date("2025-08-03"),
    },
    {_id: "2", title: "How to learn Javascript?",
      description: "I want to learn Javascript, can anyone help me?",
      tags: [
        {_id: "1", name: "JavaScript"},
      ], author: {_id: "1", name: "Filip Doe",  image: "https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"},
      upvotes: 2,
      answers: 0,
      views: 10,
      createdAt: new Date("2025-08-03"),
    },
  ]

const testError = async () => {
  try {
    await dbConnect();

  } catch (error){
    return handleError(error);
  }
}

  interface searchParams {
    searchParams: Promise <{ [key: string]: string}>
  }

const Home = async ({searchParams}: SearchParams) => {
  await testError();

  const {query = "", filter = ""} = await searchParams;

  const fileteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title.toLowerCase().includes(query?.toLowerCase())

    const matchesFilter = filter 
    ? question.tags[0].name.toLowerCase() === filter.toLowerCase() : true;

    return matchesQuery && matchesFilter;
  }
  );

  

  return (
    <>
    <section className="flex w-full flex-col-reverse sm:flex-row justify-between gap-4 sm:item-center">
      <h1 className="h1-bold text-dark100_light900"> All Questions </h1>

      <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 asChild">
        <Link
        href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
      </Button>
    </section>

    <section className="mt-11">
      <LocalSearch
       route="/"
       imgSrc='/icons/search.svg' 
       placeholder="Search questions..." 
       otherClasses="flex-1"
      
      />
    </section>
    <HomeFilter />
    <div className="mt-10 flex w-full flex-col gap-6">
      {fileteredQuestions.map((questions) => (
        <QuestionCard key={questions._id} question={questions}/>
      ))}
    </div>
  </>
  )
}

export default Home