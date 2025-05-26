import React from 'react'
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import Loadar from '../components/Loadar';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';



export default function YourConfessionScreen() {

  const [confessions, setConfessions] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()
  const [hasMore, setHasMore] = React.useState(true)



  const fetchConfessions = async () => {
    try {
      setLoading(true)

      if (!localStorage.getItem('token')) {
        navigate('/login')
        return
      }

      const response = await axios.get('http://localhost:4000/api/userconfessions?start=0&end=5', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.status === 200) {
        setConfessions(response.data)
      } else {
        toast.error('Error fetching confessions')
      }

    } catch (error) {
      console.error("Error getting documents: ", error);
      toast.error('Error fetching confessions')


    }
    finally {
      setLoading(false)
    }
  }

  const fetchMoreConfessions = async () => {
    try {

      const start = confessions?.length;
      const end = start + 5;
      const response = await axios.get(`http://localhost:4000/api/userconfessions?start=${start}&end=${end}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        const data = response.data;
        setConfessions(prev => [...prev, ...data]);
        if (data?.length < 5) {
          setHasMore(false)
          toast.info('No more confessions to load')
        }
      } else {
        toast.error('Error fetching confessions')
      }

    } catch (error) {
      console.error("Error getting documents: ", error);
      toast.error('Error fetching confessions')
    }
    finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchConfessions();

    // eslint-disable-next-line
  }, [])


  return (
    <div className='w-full gap-4 col-span-2 h-full shadow-lg'>
      {/* // main content */}
      {

        loading ?
          <div className=' overflow-y-auto overflow-x-hidden'
            style={{
              scrollbarWidth: 'none', height: '100vh', paddingBottom: '200px'
            }}
          >

            <Card key={0} data={{}} />
            <Card key={1} data={{}} />
            <Card key={2} data={{}} />
            <Card key={3} data={{}} />
            <Card key={4} data={{}} />
          </div>
          :

          <div className=' overflow-y-auto overflow-x-hidden'
            style={{
              scrollbarWidth: 'none', height: '100vh', paddingBottom: '200px',
            }}>

            <h1 className='text-3xl font-semibold text-center mt-4 mb-4'>
              Your Confessions
            </h1>
            {
              confessions.length > 0 ?
                <InfiniteScroll
                  dataLength={confessions?.length}
                  next={fetchMoreConfessions}
                  hasMore={hasMore}

                  loader={
                    <Loadar />
                  }
                  height={'100vh'}
                  style={{
                    scrollbarWidth: 'none', height: '100vh', paddingBottom: '200px'
                  }}
                >

                  {confessions.map((data, index) => {
                    return (
                      <Card key={index} data={data}
                        deleteConfession={true}
                      />
                    )
                  })}
                </InfiniteScroll>
                :
                <h1 className='text-3xl font-semibold text-center mt-4 mb-4'>
                  No Confessions Found
                </h1>

            }
          </div>
      }
    </div>

  )
}
