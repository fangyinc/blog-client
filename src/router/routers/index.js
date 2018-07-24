/**
 * Created by Staneyffer on 18-6-22.
 */

const baseComponent = r => require.ensure([], () => r(require('@/views/Base')), 'Base')
const homeComponent = r => require.ensure([], () => r(require('@/views/Home')), 'Base')
const notFoundComponent = r => require.ensure([], () => r(require('@/components/NotFound')), 'NotFound')
const loginComponent = r => require.ensure([], () => r(require('@/views/user/Login')), 'UserAdmin')
const registerComponent = r => require.ensure([], () => r(require('@/views/user/Register')), 'UserAdmin')
const postsComponent = r => require.ensure([], () => r(require('@/views/post/PostListShow')), 'Post')
const postComponent = r => require.ensure([], () => r(require('@/views/post/PostShow')), 'Post')
const newPostComponent = r => require.ensure([], () => r(require('@/views/post/PostCreate')), 'NewPost')
const updatePostComponent = r => require.ensure([], () => r(require('@/views/post/PostUpdate')), 'PostEdit')
const archiveComponent = r => require.ensure([], () => r(require('@/views/post/Archive')), 'Archive')
const infoPostComponent = r => require.ensure([], () => r(require('@/components/InfoPosts')), 'InfoPosts')
const friendComponent = r => require.ensure([], () => r(require('@/views/user/FriendListShow')), 'Friend')
const newFriendComponent = r => require.ensure([], () => r(require('@/views/user/FriendCreate')), 'Friend')

export default [
	{
		path: '/',
		name: 'BasePage',
		component: baseComponent,
		children: [
			{
				path: '',
				name: 'Home',
				component: homeComponent,
				children: [
					{
						path: '',
						name: 'index',
						component: postsComponent,
						meta: {
							title: '程方银的个人博客'
						}
					},
					{
						path: 'login',
						name: 'login',
						component: loginComponent,
						meta: {
							title: '登录'
						}
					},
					{
						path: 'register',
						name: 'Register',
						component: registerComponent,
						meta: {
							title: '注册'
						}
					},
					{
						path: 'post/:post_id',
						name: 'post',
						component: postComponent
					},
					{
						path: 'cate-posts/:id',
						name: 'catePosts',
						component: infoPostComponent,
						props: {type: 'category', name: '分类'}
					},
					{
						path: 'sec-posts/:id',
						name: 'secPosts',
						component: infoPostComponent,
						props: {type: 'section', name: '专栏'}
					},
					{
						path: 'tag-posts/:id',
						name: 'tagPosts',
						component: infoPostComponent,
						props: {type: 'tag', name: '标签'}
					},
					{
						path: 'archive',
						name: 'archive',
						component: archiveComponent
					},
					{
						path: 'friend',
						name: 'friend',
						component: friendComponent
					},
					{
						path: 'new-friend',
						name: 'newFriend',
						component: newFriendComponent
					}
				]
			},
			{
				path: 'new-post',
				name: 'NewPost',
				component: newPostComponent
			},
			{
				path: 'update-post/:post_id',
				name: 'UpdatePost',
				component: updatePostComponent
			},
			{
				path: '*',
				component: notFoundComponent
			}
		]
	}
]
