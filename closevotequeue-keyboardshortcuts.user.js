var keymap = {}
$(window).on('keydown', function(e) {
    e.preventDefault()
    keymap[String.fromCharCode(e.which)]()
})
var shortcutKeys = 'ASDFGHJKL'

$(window).on('popstate', resetToStart)

function resetToStart() {
    var i = 0
    var specialCases = [
        function() { /* leave open */ },
        function() {
            // close
            var i = 0
            var closeSpecialCases = [
                function() {
                    // duplicate
                    // TODO
                },
                function() {
                    // off-topic
                    var i = 0
                    var offtopicSpecialCases = [
                        function() {}, function() {}, function() {}, function() {}, function() {}, function() {}, function() {}, function() {}, function() {}, function() {}
                        // TODO
                    ]
                    keymap = {}
                    when(function() {
                        return $('.popup-active-pane label').length > 0
                    }, function() {
                        $('.popup-active-pane label').each(function() { getEachFunc($('span:first', this), $('input:first', this), i++, closeSpecialCases)() })
                    })
                },
                function() { /* unclear */ $('.popup-actions input').click() },
                function() { /* broad */ $('.popup-actions input').click() },
                function() { /* opinion */ $('.popup-actions input').click() },
            ]
            keymap = {}
            when(function() {
                return $('.popup-active-pane label').length > 0
            }, function() {
                $('.popup-active-pane label').each(function() { getEachFunc($('span:first', this), $('input:first', this), i++, closeSpecialCases)() })
            })
        },
        function() {
            // edit
            $(window).off('keydown')
        },
        function() { /* skip */ }
    ]
    keymap = {}
    when(function() {
        return $('.review-actions input:not([disabled])').length == 4
    }, function() {
        $('.review-actions input').each(function() { getEachFunc($(this), $(this), i++, specialCases)() })
    })
    $(window).on('popstate', resetToStart)
}

function getEachFunc(lbl, btn, i, specialCases) {
    return function() {
        var s = shortcutKeys.charAt(i)
        if (lbl.val()) {
            lbl.val('[' + s + '] ' + lbl.val())
        } else {
            lbl.text('[' + s + '] ' + lbl.text())
        }
        keymap[s] = (function(btn, i) { return function() {
            btn.click()
            specialCases[i]()
        }})(btn, i)
    }
}

function when(condition, func) {
    console.log('when called')
    console.log(condition)
    var intr = setInterval(function() {
        if (condition()) {
            clearInterval(intr)
            func()
        }
        console.log('oops')
    }, 100)
}
