module ClassTaHelper
  def as_json(options={})
    super(options.merge(:include => [:type]))
  end

  def type
    r  = self.attributes["type"]
    def r.serializable_hash(arg)
      self
    end
    r
  end
end
