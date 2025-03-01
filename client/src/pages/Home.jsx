import React, {useState, useEffect} from 'react';
import Post from '../../../server/models/Post';


import {Loader, Card, FormField} from "../components";

const RenderCards = ({data, title}) => {

    if(data?.length > 0){
        return data.map( (post) => <Card key={post._id} {...post} /> )
    }

    return (
        <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
    )
}


const Home = () => {

    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState(null);

    const [searchText, setSearchText] = useState('');
    const [searchedResult, setSearchedResult] = useState(null);

    useEffect( () => {
        const fetchPosts = async () => {
            setLoading(true);
            try{
                const response = await fetch("https://emberglow.onrender.com/api/v1/post");
                console.log(response);

                const result = await response.json();
                const data = result.data;
                setAllPosts(data.reverse());
                console.log("data", data)

            }catch(error){

            }finally{
                setLoading(false);
            }
        };

        fetchPosts();
 
    }, [] );



    const handleSearchChange =async (e) => {
        
        setSearchText(e.target.value);

        const searchResult = await allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase())  );
        setSearchedResult(searchResult);

        
        
        
        

        

    }


  return (
    <section className="max-w-7xl mx-auto">
        <div>
            <h1 className="font-extrabold   text-[#222328] text-[32px]">Preserve Your Precious Moments Forever.</h1>
            <p className="mt-2 text-[#666e75] text-[14px] max-w-[700px]">Capture your favorite memories, add a meaningful story, 
            and relive them anytime. Your journey, your moments, your legacy </p>
        </div>

        <div className="mt-16">

            <FormField 
                labelName="Search your memory" 
                type="text" 
                name="searchText"
                placeholder="Mention name or story..."
                value={searchText}
                handleChange={handleSearchChange}
            />
        </div>

        <div className="mt-10">
            {
                loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ): (
                    <>
                        {
                            searchText && (
                                <h2 className="font-medium text-[#666e75] text-xl mb-3">
                                    Showing results for <span className="text-[#222328]" >{searchText}</span>
                                </h2>
                            )
                        }
                        <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1">
                            {
                                searchText ? (
                                    <RenderCards 
                                        data={searchedResult}
                                        title="No search results found"
                                    />
                                ) : (
                                    <RenderCards 
                                        data={allPosts}
                                        title="No posts found"
                                    />
                                )

                            }

                        </div>

                    </>
                )
            }

        </div>

    </section>
  )
}

export default Home