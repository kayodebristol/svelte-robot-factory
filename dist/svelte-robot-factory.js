function c(t) {
  return { enumerable: !0, value: t };
}
function p(t) {
  return { enumerable: !0, writable: !0, value: t };
}
let f = {}, j = () => !0, w = (t) => t, O = (t, n, e, i) => t.apply(e, i) && n.apply(e, i), q = (t, n, e, [i, r]) => n.call(e, t.call(e, i, r), r), h = (t, n) => Object.freeze(Object.create(t, n));
function m(t, n, e) {
  return t.reduce((i, r) => function(...o) {
    return e(i, r, this, o);
  }, n);
}
function g(t) {
  return h(this, { fn: c(t) });
}
let T = {};
g.bind(T);
let _ = {};
g.bind(_);
function y(t, n) {
  return n.filter((e) => t.isPrototypeOf(e));
}
function x(t, n, ...e) {
  let i = m(y(_, e).map((o) => o.fn), j, O), r = m(y(T, e).map((o) => o.fn), w, q);
  return h(this, {
    from: c(t),
    to: c(n),
    guards: c(i),
    reducers: c(r)
  });
}
let z = {}, k = {};
x.bind(z);
x.bind(k, null);
function C(t, n, e, i) {
  let { context: r } = t;
  for (let { to: o, guards: d, reducers: l } of i)
    if (d(r, e)) {
      t.context = l.call(t, r, e);
      let s = n.original || n, u = h(s, {
        current: c(o),
        original: { value: s }
      });
      return f._onEnter && f._onEnter(n, o, t.context, r, e), u.state.value.enter(u, t, e);
    }
}
function M(t, n) {
  let e = n.type || n, { machine: i } = t, { value: r, name: o } = i.state;
  return r.transitions.has(e) ? C(t, i, n, r.transitions.get(e)) || i : (f._send && f._send(e, o), i);
}
let N = {
  send(t) {
    this.machine = M(this, t), this.onChange(this);
  }
};
function S(t, n, e, i) {
  let r = Object.create(N, {
    machine: p(t),
    context: p(t.context(e, i)),
    onChange: c(n)
  });
  return r.send = r.send.bind(r), r.machine = r.machine.state.value.enter(r.machine, r, i), r;
}
function b() {
}
function B(t, n) {
  return t != t ? n == n : t !== n || t && typeof t == "object" || typeof t == "function";
}
const a = [];
function E(t, n = b) {
  let e;
  const i = /* @__PURE__ */ new Set();
  function r(l) {
    if (B(t, l) && (t = l, e)) {
      const s = !a.length;
      for (const u of i)
        u[1](), a.push(u, t);
      if (s) {
        for (let u = 0; u < a.length; u += 2)
          a[u][0](a[u + 1]);
        a.length = 0;
      }
    }
  }
  function o(l) {
    r(l(t));
  }
  function d(l, s = b) {
    const u = [l, s];
    return i.add(u), i.size === 1 && (e = n(r) || b), l(t), () => {
      i.delete(u), i.size === 0 && e && (e(), e = null);
    };
  }
  return { set: r, update: o, subscribe: d };
}
function P(t, n) {
  const { subscribe: e, set: i } = E(
    S(t, (r) => i(r), n)
  );
  return { subscribe: e };
}
export {
  P as useMachine
};
