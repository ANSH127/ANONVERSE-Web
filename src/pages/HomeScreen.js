import React, { useEffect } from 'react';
import Card from '../components/Card';
import { confessionRef, usersRef } from '../config/firebase';
import { getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAvtarList, setAvtar, setUser } from '../redux/slices/user';
import { toast } from 'react-toastify';
import Loadar from '../components/Loadar';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function HomeScreen() {
  const dispatch = useDispatch()
  const avatarlist = useSelector(state => state.user.AvtarList)

  const navigate = useNavigate()
  const [confessions, setConfessions] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [hasMore, setHasMore] = React.useState(true)


  const fetchConfessions = async () => {
    try {

      setLoading(true)
      const q = query(confessionRef, orderBy('createdAt', 'desc'), limit(5));
      const docSnap = await getDocs(q);
      let data = []
      docSnap.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id })
      });
      setConfessions(data)

    } catch (error) {
      console.error("Error getting documents: ", error);
      toast.error('Error fetching confessions')


    }
    finally {
      setLoading(false)
    }
  }

  const fetchAllUsersAvatar = async () => {
    try {
      let uid = JSON.parse(localStorage.getItem('user'))?.uid
      if (localStorage.getItem('user') === null) {
        navigate('/login')
        return
      }
      let data = []
      let querySnapshot = await getDocs(usersRef);
      querySnapshot.forEach((doc) => {
        data.push({ avatar: doc.data().avatar, uid: doc.data().uid, id: doc.id, name: doc.data().name })

      });
      dispatch(setAvtarList(data))
      let avtar = data.filter((item) => item.uid === uid)
      dispatch(setAvtar(avtar[0].avatar))
      dispatch(setUser(avtar[0]))

    } catch (error) {
      console.error("Error getting documents: ", error);
      toast.error('Error fetching users')
    }
  }

  const fetchMoreConfessions = async () => {
    try {
      const q = query(confessionRef, orderBy('createdAt', 'desc'), startAfter(confessions[confessions.length - 1].createdAt), limit(5));
      const docSnap = await getDocs(q);
      let data = []
      docSnap.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id })
      });
      if (data.length < 5) {
        toast.info('No more confessions to load')
        setHasMore(false)
      }
      setConfessions(confessions.concat(data))

    } catch (error) {
      console.error("Error getting documents: ", error);
      toast.error('Error fetching confessions')

    }
  }


  useEffect(() => {
    fetchAllUsersAvatar()
    fetchConfessions();

    // eslint-disable-next-line
  }, [])


  return (
    <div className='gap-4 col-span-2 h-full shadow-lg'>
      {/* // main content */}
      {
        loading ?
          <Loadar />
          :
          <div className=' overflow-y-auto overflow-x-hidden'
          >
            {
              confessions.length > 0 ?
                <InfiniteScroll
                  dataLength={confessions.length}
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
                  {
                    confessions.map((data, index) => (
                      data.reportedBy.length < 6 &&

                      <Card key={index} data={data}
                        avatarName={avatarlist.filter((item) => item.uid === data.uid)[0].avatar}
                      />
                    ))
                  }

                </InfiniteScroll>

                :
                <h1 className='text-3xl font-semibold text-center mt-4 mb-4'>
                  No Confessions Found
                </h1>
            }
          </div>
      }
    </div>

  );
}
