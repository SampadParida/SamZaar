
export default function Loader() {
    return (
        <div className="w-full left-0 right-0 top-0 inline-block">
            <div className="w-full"></div>
            <div className="text-center w-full">
                <span className="flex justify-center items-center">
                    <h1 className="text-2xl font-bold">
                        <div className="inline-block bg-white items-cente text-center px-5 py-5 flex items-center justify-center rounded-full" style={{'width':'100px', height:'100px'}}>
                            <svg className="animate-spin h-5 w-5 inline" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="gray" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="#006bff" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    </h1>
                </span>
            </div>
        </div>
    )
}