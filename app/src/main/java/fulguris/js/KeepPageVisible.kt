package fulguris.js

import com.anthonycr.mezzanine.FileStream

/**
 * JavaScript 注入脚本，用于覆盖页面可见性 API，使网页始终认为自己是可见的
 * JavaScript injection to override Page Visibility API, making pages always think they're visible
 */
@FileStream("app/src/main/js/KeepPageVisible.js")
interface KeepPageVisible {
    fun provideJs(): String
}
