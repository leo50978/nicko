export default class HeaderComponent {
  constructor(rootId) {
    this.root = document.getElementById(rootId);
    this.isSolid = false;
    this.onScroll = this.onScroll.bind(this);

    if (!this.root) {
      console.error(`Header root introuvable: ${rootId}`);
      return;
    }

    this.render();
    this.attachScrollBehavior();
  }

  render() {
    this.root.innerHTML = `
      <div class="h-[82px]"></div>
      <header data-header-shell class="fixed inset-x-0 top-0 z-50 transition-all duration-300">
        <div class="mx-auto flex w-full max-w-[1120px] items-center justify-between px-4 py-5 md:px-8">
          <div data-header-logo class="text-[28px] font-semibold leading-none tracking-[-0.03em] text-white md:text-[38px]">
            Revolut
          </div>

          <nav class="hidden items-center gap-10 text-[15px] font-semibold md:flex">
            <a href="#" data-header-link class="transition hover:opacity-75">Personal</a>
            <a href="#" data-header-link class="transition hover:opacity-75">Business</a>
            <a href="#" data-header-link class="transition hover:opacity-75">Kids & Teens</a>
            <a href="#" data-header-link class="transition hover:opacity-75">Company</a>
          </nav>

          <div class="hidden items-center gap-8 md:flex">
            <a href="#" data-header-login class="text-[15px] font-semibold transition hover:opacity-75">Log in</a>
            <button type="button" data-header-cta class="min-h-[48px] rounded-full px-6 py-3 text-[15px] font-semibold transition">
              Sign up
            </button>
          </div>
        </div>
      </header>
    `;

    this.shell = this.root.querySelector("[data-header-shell]");
    this.logo = this.root.querySelector("[data-header-logo]");
    this.links = [...this.root.querySelectorAll("[data-header-link]")];
    this.login = this.root.querySelector("[data-header-login]");
    this.cta = this.root.querySelector("[data-header-cta]");
    this.applyVisualState(false);
  }

  attachScrollBehavior() {
    window.addEventListener("scroll", this.onScroll, { passive: true });
    window.addEventListener("resize", this.onScroll);

    requestAnimationFrame(this.onScroll);
    setTimeout(this.onScroll, 120);
  }

  getScrollThreshold() {
    const anchorIds = ["sierra-salary-root", "sierra-proof-root"];
    let threshold = null;

    anchorIds.forEach((id) => {
      const node = document.getElementById(id);
      if (!node) return;
      const nodeTop = node.getBoundingClientRect().top + window.scrollY - 82;
      threshold = threshold === null ? nodeTop : Math.min(threshold, nodeTop);
    });

    return threshold === null ? 140 : Math.max(80, threshold);
  }

  onScroll() {
    const shouldBeSolid = window.scrollY >= this.getScrollThreshold();
    if (shouldBeSolid === this.isSolid) return;
    this.isSolid = shouldBeSolid;
    this.applyVisualState(this.isSolid);
  }

  applyVisualState(isSolid) {
    if (!this.shell || !this.logo || !this.login || !this.cta) return;

    if (isSolid) {
      this.shell.className =
        "fixed inset-x-0 top-0 z-50 border-b border-[#d8d8d8] bg-white/95 backdrop-blur-md transition-all duration-300";
      this.logo.className =
        "text-[28px] font-semibold leading-none tracking-[-0.03em] text-[#171b23] md:text-[38px]";
      this.links.forEach((link) => {
        link.className = "text-[#171b23] transition hover:opacity-75";
      });
      this.login.className = "text-[15px] font-semibold text-[#171b23] transition hover:opacity-75";
      this.cta.className =
        "min-h-[48px] rounded-full bg-[#171b23] px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-black";
      return;
    }

    this.shell.className = "fixed inset-x-0 top-0 z-50 transition-all duration-300";
    this.logo.className =
      "text-[28px] font-semibold leading-none tracking-[-0.03em] text-white md:text-[38px]";
    this.links.forEach((link) => {
      link.className = "text-white transition hover:opacity-75";
    });
    this.login.className = "text-[15px] font-semibold text-white transition hover:opacity-75";
    this.cta.className =
      "min-h-[48px] rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-[#171b23] transition hover:bg-white/90";
  }
}
