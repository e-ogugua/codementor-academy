import { CodingQuiz } from '../components/CodingQuiz';

export function QuizPage() {
  return (
    <section className='relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 safe-top safe-bottom'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-8 sm:mb-12'>
          <h3 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6'>
            Knowledge Assessment
          </h3>
          <p className='text-base sm:text-lg md:text-xl text-purple-200 max-w-2xl mx-auto leading-relaxed'>
            Interactive quizzes to test and reinforce your programming knowledge
          </p>
        </div>
        <CodingQuiz />
      </div>
    </section>
  );
}

export default QuizPage;
