
const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 my-32">
        <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Blog!</h1>
        <p className="md:text-lg text-gray-500/70 pb-8">Subscribe to get the latest blog, new tech, and exclusive news.</p>
        <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
            <input
                className="border border-gray-300 rounded-md rounded-r-none h-full w-full
                 border-r-0 px-3 text-gray-500 outline-none"
             type="text" placeholder="Enter your email" required/>
            <button type="submit"
             className="md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all 
              rounded-md rounded-l-none">Subscribe</button>
        </form>
    </div>
  )
}

export default Newsletter