/**
 * Created by Staneyffer on 18-7-18.
 */

export const beforeHook = (to, from, next) => {
	if(to.meta.title){
		document.title = to.meta.title
	}
	next()
}
