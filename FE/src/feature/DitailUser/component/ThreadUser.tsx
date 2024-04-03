import { useSelector } from 'react-redux'
import { RootState } from '../../../store/type'
import { CardUserThread } from '../../../components/CardUserThread'

export const ThreadUser = () => {
    const thread = useSelector((state:RootState)=> state.threadUser)

  return (
    <>
        {thread.map((items)=> (
          <CardUserThread key={items.id} data={items}/>
        ))}
    </>
  )
}
