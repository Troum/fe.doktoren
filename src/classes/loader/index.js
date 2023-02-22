import {commonStorage} from "@/store";

class Loader {
  submitLoading;
  actionLoading;
  specialitiesLoading;
  universitiesLoading;
  routeLoading;

  routeChange() {
    return {
      set: (status) => {
        commonStorage().onRouteChanging(status)
      },
      get: () => {
        return commonStorage().routeChanging
      }
    }
  }

  submit() {
    return {
      set: (status) => {
        this.submitLoading = status
      },
      get: () => {
        return this.submitLoading
      }
    }
  }

  action() {
    return {
      set: (status) => {
        this.actionLoading = status
      },
      get: () => {
        return this.actionLoading
      }
    }
  }

  specialities() {
    return {
      set: (status) => {
        this.specialitiesLoading = status
      },
      get: () => {
        return this.specialitiesLoading
      }
    }
  }

  universities() {
    return {
      set: (status) => {
        this.universitiesLoading = status
      },
      get: () => {
        return this.universitiesLoading
      }
    }
  }
}

export default new Loader()
