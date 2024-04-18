'use client'
import React, { useEffect, useState } from 'react';
import { getDataApiCall } from '@/utils/getData';
import dynamic from 'next/dynamic';
import Loader from '@/components/ui/Loader';


const ListTable = dynamic(
	() => import('@/components/dashboard/listTable/ListTable'),
	{
		loading: () => <div className='d-flex justify-content-center'><Loader/></div>,
		ssr: false,
	},
);


function InvoiceDashboardPage() {
  const [toolData, setToolData] = useState<any>([])
  const [blogData, setBlogData] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const toolsResponse: any = await getDataApiCall("/api/tool");
        const blogsResponse: any = await getDataApiCall("/api/blog");
  
        if (toolsResponse) {
          setToolData(toolsResponse.tools);
        }
  
        if (blogsResponse) {
          setBlogData(blogsResponse.blogs);
        }
  
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className='col-10 mx-auto py-3'>
      <h4>Tools</h4>
      <div className="mt-3">
        <ListTable
          Data={toolData}
          type="tool"
          isMainPage={true}
          />
      </div>
      <h4>Blogs</h4>
      <div className="mt-3">
        <ListTable
          Data={blogData}
          type="blog"
          isMainPage={true}
        />
      </div>
    </div>
  );
}

export default InvoiceDashboardPage;
