import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config';
import { db } from '@/lib/db';
import PostFeed from '../PostFeed';

interface CustomFeedProps { 
  userSubscriptions: any[];
}

const CustomFeed = async ({ userSubscriptions }: CustomFeedProps) => {

  const posts = await db.post.findMany({
    where: {
      subreddit: {
        name: {
          in: userSubscriptions.map((sub) => sub.subreddit.name),
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      subreddit: true,
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  })

  return <PostFeed initialPosts={posts} />
}

export default CustomFeed
