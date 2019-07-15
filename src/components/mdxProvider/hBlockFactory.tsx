import React from 'react';
import { slugify } from 'underscore.string';

import { Utils } from '../../utils';

type HBlockType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const HBlockFactory = <T extends HBlockType>(headerBlock: T): React.FunctionComponent<React.ComponentPropsWithoutRef<T>> => {
  return ({ children, ...restOfProps }) => {
    if (Utils.IsString(children)) {
      const slug = slugify(children);

      return React.createElement(
        headerBlock,
        {
          ...restOfProps,
          id: slug,
        },
        <>
          {children}
          {
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <a href={`#${slug}`} className="anchor" aria-labelledby={slug} />
          }
        </>
      );
    }

    return React.createElement(headerBlock, restOfProps, children);
  };
};

export default HBlockFactory;
