/**
 * navigation.js
 *
 * Handles dropdown for the primary menu
 * and toggling it for small screens.
 *
 * Based on the work of the WordPress team in the Twenty Twenty-One WordPress Theme.
 *
 * @since Marianne 1.2
 */

/**
 * Collapse menu when the user clicks outside.
 */
function marianneCollapseMenuOnClickOutside( event ) {
	if ( ! document.getElementById( 'menu-primary' ).contains( event.target ) ) {
		document.getElementById( 'menu-primary' ).querySelectorAll( '.sub-menu-toggle' ).forEach( function( button ) {
			button.setAttribute( 'aria-expanded', 'false' );
		} );
	}
}

/**
 * Toggle an attribute's value
 *
 * @param {Element} el - The element.
 */
function marianneToggleAriaExpanded( el, withListeners ) {
	if ( 'true' !== el.getAttribute( 'aria-expanded' ) ) {
		el.setAttribute( 'aria-expanded', 'true' );
		if ( withListeners ) {
			document.addEventListener( 'click', marianneCollapseMenuOnClickOutside );
		}
	} else {
		el.setAttribute( 'aria-expanded', 'false' );
		if ( withListeners ) {
			document.addEventListener( 'click', marianneCollapseMenuOnClickOutside );
		}
	}
}

/**
 * Handle clicks on submenu toggles except on small screens.
 *
 * @param {Element} el - The element.
 */
function marianneExpandSubMenu( el ) {

	if ( window.matchMedia( "(min-width: 500px)" ).matches ) {
		// Close other expanded items.
		el.closest( 'nav' ).querySelectorAll( '.sub-menu-toggle' ).forEach( function( button ) {
			if ( button !== el ) {
				button.setAttribute( 'aria-expanded', 'false' );
			}
		});

		// Toggle aria-expanded on the button.
		marianneToggleAriaExpanded( el, true );

		// On tab-away collapse the menu.
		el.parentNode.querySelectorAll( 'ul > li:last-child > a' ).forEach( function( linkEl ) {
			linkEl.addEventListener( 'blur', function( event ) {
				if ( ! el.parentNode.contains( event.relatedTarget ) ) {
					el.setAttribute( 'aria-expanded', 'false' );
				}
			});
		});
	} else {
		el.removeAttribute( 'aria-haspopup' ).removeAttribute( 'aria-expanded' );
	}
}

/**
 * Handle clicks on mobile menu button.
 *
 * @param {Element} el - The element.
 */
function marianneExpandMobileMenu( el ) {
	if ( 'true' !== el.getAttribute( 'aria-expanded' ) ) {
		el.setAttribute( 'aria-expanded', 'true' );
	} else {
		el.setAttribute( 'aria-expanded', 'false' );
	}
}

( function ( $ ) {
	/**
	 * Toogle the menu on click on small screens.
	 */
	$( '#menu-mobile-button' ).click( function () {
		$( '#menu-primary-container' ).slideToggle( 200 );
	});

	/**
	 * Indicate submenus
	 *
	 * Adds the attributes aria-haspopup and aria-expanded
	 * to links to submenus with their default values.
	 */
	var menu_elements = $( '#menu-primary .menu-item' );
	menu_elements.each( function ( el, item ) {
		$( item ).children( 'a' ).attr( 'role', 'menu-item' );
		$( item ).children( 'a' ).attr( 'tabindex', '-1' );
	});

	/**
	 * Change aria-expanded value on hover except on small screens.
	 */
	if ( window.matchMedia( "(min-width: 500px)" ).matches ) {
		$( '#menu-primary .menu-item-has-children' ).hover( function () {
			$( this ).find( '.sub-menu-toggle' ).attr( 'aria-expanded', 'true' );
		}, function(){
			$( this ).find( '.sub-menu-toggle' ).attr( 'aria-expanded', 'false' );
		});
	} else {
		$( '.sub-menu-toggle' ).removeAttr( 'aria-haspopup' ).removeAttr( 'aria-expanded' );
		$( '#menu-mobile-button' ).attr( 'aria-haspopup', 'true' ).attr( 'aria-expanded', 'false' );
	}

} )( jQuery );
