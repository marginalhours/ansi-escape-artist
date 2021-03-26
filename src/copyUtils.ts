
import particles from './particles';

const clearSelection = () => {
  if (window.getSelection) {
    // @ts-ignore
    if (window.getSelection().empty) {  // Chrome
      // @ts-ignore
      window.getSelection().empty();
      // @ts-ignore
    } else if (window.getSelection().removeAllRanges) {  // Firefox
      // @ts-ignore
      window.getSelection().removeAllRanges();
    }
    // @ts-ignore
  } else if (document.selection) {  // IE?
    // @ts-ignore
    document.selection.empty();
  }
}

export const copyFromDiv = (selector: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  const copyText = document.querySelector(selector) as HTMLDivElement;
  /* Clear any existing selection */
  clearSelection();

  /* Select the text field */
  // @ts-ignore
  if (document.selection) {
    // @ts-ignore
    var range = document.body.createTextRange();
    range.moveToElementText(copyText);
    range.select().createTextRange();
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(copyText);
    // @ts-ignore
    window.getSelection().addRange(range);
  }

  /* Copy the text inside the text field */
  document.execCommand("copy");

  (function deselect() {
    var selection = ('getSelection' in window)
      ? window.getSelection()
      : ('selection' in document)
        // @ts-ignore
        ? document.selection
        : null;
    if ('removeAllRanges' in selection) selection.removeAllRanges();
    else if ('empty' in selection) selection.empty();
  })();

  particles.addParticle({
    position: {
      x: event.clientX - 100,
      y: event.clientY - 20
    },
    contents: 'copied to clipboard',
    velocity: { x: 0, y: -40 },
    style: {
      padding: '2px 2px',
      borderRadius: '5px',
      fontSize: '18px',
      display: 'block',
      width: '200px',
      textAlign: 'center',
      fontFamily: 'sans-serif',
      opacity: [1.0, 0.0],
      backgroundColor: "#fff",
    }
  });
}

export const copyFromInput = (selector: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  const copyText = document.querySelector(selector) as HTMLInputElement;
  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");

  (function deselect() {
    var selection = ('getSelection' in window)
      ? window.getSelection()
      : ('selection' in document)
        //@ts-ignore
        ? (document as HTMLDocumentElement).selection
        : null;
    if ('removeAllRanges' in selection) selection.removeAllRanges();
    else if ('empty' in selection) selection.empty();
  })();

  particles.addParticle({
    position: {
        x: event.clientX - 100,
        y: event.clientY - 20
    },
    contents: 'copied to clipboard',
    velocity: { x: 0, y: -40 },
    style: { 
      padding: '2px 2px', 
      borderRadius: '5px',
      fontSize: '18px', 
      display: 'block',
      width: '200px',
      textAlign: 'center',
      fontFamily: 'sans-serif', 
      opacity: [1.0, 0.0], 
      backgroundColor: "#fff",
    }
  });
}