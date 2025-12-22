describe('rem()', () => {
  describe('function', () => {
    it('should return pixel values converted to rem', async () => {
      const css = await global.compileCSS('test/data/rem/rem-only.scss');

      expect(css).toMatchSnapshot();
    });

    it('should return multiple values', async () => {
      const css = await global.compileCSS('test/data/rem/multiples.scss');

      expect(css).toMatchSnapshot();
    });
  });

  describe('mixin', () => {
    it('should return pixel values, and rem values', async () => {
      const css = await global.compileCSS('test/data/rem/mixin-px-and-rem.scss');

      expect(css).toMatchSnapshot();
    });

    it('should return rem only values, when pixel fallback is disabled', async () => {
      const css = await global.compileCSS('test/data/rem/mixin-rem-only.scss');

      expect(css).toMatchSnapshot();
    });
  });
});
