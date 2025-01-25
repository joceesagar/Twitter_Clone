import {
    getProfileByUsername,
    getUserLikedPosts,
    getUserPosts,
    isFollowing,
} from "@/actions/profile.action";
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";

type ParamsType = Promise<{ username: string }>;


export async function generateMetadata(props: { params: ParamsType }) {
    const { username } = await props.params; // Resolve the promise
    console.log(username)
    const user = await getProfileByUsername(username);

    if (!user) return;

    return {
        title: `${user.name ?? user.username}`,
        description: user.bio || `Check out ${user.username}'s profile.`,
    };
}

async function ProfilePageServer(props: { params: ParamsType }) {
    const { username } = await props.params; // Resolve the promise
    const user = await getProfileByUsername(username);

    if (!user) notFound();

    const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
        getUserPosts(user.id),
        getUserLikedPosts(user.id),
        isFollowing(user.id),
    ]);

    return (
        <ProfilePageClient
            user={user}
            posts={posts}
            likedPosts={likedPosts}
            isFollowing={isCurrentUserFollowing}
        />
    );
}
export default ProfilePageServer;