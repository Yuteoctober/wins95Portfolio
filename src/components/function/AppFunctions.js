

export function StyleHide(index, tap,  MybioExpand, ResumeExpand, ProjectExpand, MailExpand, NftExpand, NoteExpand, TypeExpand, WinampExpand, ResumeFileExpand) {
  const boxshadowstyleTrue = 'inset 1px 1px #000, 1px 1px #ffffffdd';
  const bgStyleTrue = 'rgb(221, 220, 220)';

  const boxshadowstyleFalse = 'inset 1px 1px #ffffffdd, 1.5px 1.5px #000';
  const bgStyleFalse = '#b3b2b2';

  switch (tap[index]) {
    case 'MyBio':
      return MybioExpand.focusItem
        ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
        : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

    case 'Resume':
      return ResumeExpand.focusItem
        ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
        : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

    case 'Project':
      return ProjectExpand.focusItem
        ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
        : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

    case 'Mail':
      return MailExpand.focusItem
        ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
        : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

    case 'Nft':
      return NftExpand.focusItem
        ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
        : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

    case 'Note':
      return NoteExpand.focusItem
        ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
        : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

    case 'Type':
      return TypeExpand.focusItem
        ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
        : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

    case 'Winamp':
      return WinampExpand.focusItem
        ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
        : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

    case 'ResumeFile':
      return ResumeFileExpand.focusItem
        ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
        : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

    default:
      return {};
  }
}
