const buttons =
    document.querySelectorAll(
        "form[aria-label='Select projects'] .collapsible-sidebar-widget-button")
buttons.forEach(x => x.dispatchEvent(new Event("mousedown")))